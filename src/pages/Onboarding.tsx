import { useNavigate } from 'react-router-dom';
import { BottomActions, Chip, PageTitle, PrimaryButton, Screen, StepHeader } from '../components/ui';
import { Check } from '../components/icons';
import { BUDGETS, CITIES, INTERESTS } from '../data/events';
import { useAppState } from '../state/AppState';

export function OnboardingCity() {
  const { city, setCity } = useAppState();
  return (
    <Screen>
      <div className="h-full px-4 pt-4">
        <StepHeader back="/welcome" step={1} />
        <PageTitle className="mb-6 mt-7" title="Where are you at?" sub="We'll show you what's on nearby." />
        <div className="flex flex-col" role="radiogroup" aria-label="City">
          {CITIES.map((c) => {
            const on = c === city;
            return (
              <button
                key={c}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setCity(c)}
                className={`flex h-[60px] items-center justify-between border-0 border-b border-solid border-line-100 bg-transparent p-0 text-left text-[20px] ${
                  on ? 'font-bold text-white' : 'font-medium text-white/85'
                }`}
              >
                {c}
                {on && (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-on-brand">
                    <Check size={16} strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <BottomActions>
          <PrimaryButton to="/onboarding/interests">Continue</PrimaryButton>
        </BottomActions>
      </div>
    </Screen>
  );
}

export function OnboardingInterests() {
  const { interests, toggleInterest } = useAppState();
  const navigate = useNavigate();
  const enough = interests.length >= 3;
  return (
    <Screen>
      <div className="h-full px-4 pt-4">
        <StepHeader back="/onboarding/city" step={2} />
        <PageTitle className="mb-7 mt-7" title="What are you into?" sub="Pick 3 or more. We'll tune your feed." />
        <div className="flex flex-wrap gap-2.5">
          {INTERESTS.map((i) => (
            <Chip key={i} selected={interests.includes(i)} onClick={() => toggleInterest(i)}>
              {i}
            </Chip>
          ))}
        </div>
        <BottomActions>
          <PrimaryButton disabled={!enough} onClick={() => navigate('/onboarding/budget')}>
            {enough ? 'Continue' : `Pick ${3 - interests.length} more`}
          </PrimaryButton>
        </BottomActions>
      </div>
    </Screen>
  );
}

export function OnboardingBudget() {
  const { budget, setBudget, showFree, setShowFree, completeOnboarding } = useAppState();
  const navigate = useNavigate();
  return (
    <Screen>
      <div className="h-full px-4 pt-4">
        <StepHeader back="/onboarding/interests" step={3} />
        <PageTitle className="mb-6 mt-7" title="What's your budget?" sub="Per event. Change it anytime." />
        <div role="radiogroup" aria-label="Budget" className="flex flex-col gap-2.5">
          {BUDGETS.map((b) => {
            const on = b.id === budget;
            return (
              <button
                key={b.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setBudget(b.id)}
                className={`flex h-[76px] items-center justify-between rounded-lg border-2 bg-surface-100 px-5 text-left text-white ${on ? 'border-brand' : 'border-surface-100'}`}
              >
                <span className="flex flex-col gap-[3px]">
                  <span className="text-[19px] font-bold">{b.title}</span>
                  <span className="text-[14px] text-white/60">{b.sub}</span>
                </span>
                {on ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand">
                    <span className="h-2 w-2 rounded-full bg-ink" />
                  </span>
                ) : (
                  <span className="h-6 w-6 rounded-full border-2 border-[#4a4a4a]" />
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-[22px] flex min-h-[52px] items-center justify-between">
          <span id="free-first" className="text-[16px] font-medium">
            Always show free events
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={showFree}
            aria-labelledby="free-first"
            onClick={() => setShowFree(!showFree)}
            className={`relative h-8 w-[52px] rounded-full p-0 transition-colors ${showFree ? 'bg-brand' : 'bg-line-300'}`}
          >
            <span className={`absolute top-1 h-6 w-6 rounded-full transition-all ${showFree ? 'right-1 bg-ink' : 'right-[24px] bg-white'}`} />
          </button>
        </div>
        <BottomActions>
          <PrimaryButton
            onClick={() => {
              completeOnboarding();
              navigate('/feed');
            }}
          >
            Let's go
          </PrimaryButton>
        </BottomActions>
      </div>
    </Screen>
  );
}
