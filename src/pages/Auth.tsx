import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scene } from '../components/Scene';
import { PasswordField, PrimaryButton, BackButton, PageTitle, Screen, SecondaryButton, TextField } from '../components/ui';
import { useAppState } from '../state/AppState';
import { useRef, useState } from 'react';

/* ---------- Splash ---------- */

export function Splash() {
  const navigate = useNavigate();
  const { onboarded } = useAppState();
  const next = onboarded ? '/feed' : '/welcome';

  useEffect(() => {
    const t = setTimeout(() => navigate(next, { replace: true }), 1500);
    return () => clearTimeout(t);
  }, [navigate, next]);

  return (
    <Screen yellow>
      <div className="flex h-full items-center justify-center">
        <img src="/brand/yeahzy-logo-black.svg" alt="Yeahzy" width={275} height={82} className="h-auto w-[275px]" />
      </div>
      <Link to={next} aria-label="Get started" className="absolute inset-0" />
    </Screen>
  );
}

/* ---------- Welcome ---------- */

export function Welcome() {
  return (
    <Screen>
      <Scene name="club" />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0) 30%, rgba(10,10,10,0.85) 52%, #0a0a0a 64%)' }} />
      <div className="absolute bottom-8 left-5 right-5 flex flex-col gap-3">
        <h1 className="type-hero m-0 mb-1">
          Your city.
          <br />
          Tonight.
        </h1>
        <p className="m-0 mb-4 text-[16px] text-white/70">Swipe through what's on. Save what you love.</p>
        <PrimaryButton to="/signup">Create account</PrimaryButton>
        <SecondaryButton to="/onboarding/city">Continue with Apple</SecondaryButton>
        <SecondaryButton to="/onboarding/city">Continue with Google</SecondaryButton>
        <p className="m-0 mt-2 text-center text-[15px] text-white/70">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-white underline underline-offset-[3px]">
            Log in
          </Link>
        </p>
      </div>
    </Screen>
  );
}

/* ---------- Sign up ---------- */

export function Signup() {
  const navigate = useNavigate();
  const { email, setEmail } = useAppState();
  return (
    <Screen>
      <form
        className="h-full px-5 pt-4"
        onSubmit={(e) => {
          e.preventDefault();
          navigate('/verify');
        }}
      >
        <BackButton to="/welcome" />
        <PageTitle className="mb-7 mt-5" title="Create your account" sub="Save events and get picks that fit you." />
        <div className="flex flex-col gap-4">
          <TextField id="su-name" label="First name" placeholder="What should we call you?" autoComplete="given-name" />
          <TextField id="su-email" label="Email" type="email" placeholder="you@example.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <PasswordField id="su-pass" label="Password" placeholder="8+ characters" autoComplete="new-password" />
        </div>
        <p className="m-0 mt-5 text-[13px] leading-[1.5] text-white/60">
          By signing up you agree to our{' '}
          <a href="#terms" className="text-white underline">
            Terms
          </a>{' '}
          and{' '}
          <a href="#privacy" className="text-white underline">
            Privacy Policy
          </a>
          .
        </p>
        <div className="absolute bottom-7 left-5 right-5 flex flex-col gap-4">
          <button type="submit" className="flex h-[58px] w-full items-center justify-center rounded-full bg-brand text-[17px] font-bold text-on-brand active:scale-[0.98]">
            Create account
          </button>
          <p className="m-0 text-center text-[15px] text-white/70">
            Already on Yeahzy?{' '}
            <Link to="/login" className="font-bold text-white underline underline-offset-[3px]">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </Screen>
  );
}

/* ---------- Verify ---------- */

export function Verify() {
  const navigate = useNavigate();
  const { email } = useAppState();
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const [focused, setFocused] = useState(0);
  const [seconds, setSeconds] = useState(24);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, '').slice(-1);
    setDigits((prev) => prev.map((x, j) => (j === i ? d : x)));
    if (d && i < 5) refs.current[i + 1]?.focus();
  };

  const complete = digits.every(Boolean);

  return (
    <Screen>
      <div className="h-full px-5 pt-4">
        <BackButton to="/signup" />
        <h1 className="type-title m-0 mb-2 mt-5">Check your email</h1>
        <p className="m-0 mb-8 text-[16px] leading-[1.45] text-white/65">
          We sent a 6-digit code to <span className="font-bold text-white">{email || 'you@example.com'}</span>
        </p>
        <fieldset className="m-0 border-0 p-0">
          <legend className="sr-only">Verification code</legend>
          <div className="grid grid-cols-6 gap-2">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                aria-label={`Digit ${i + 1}`}
                inputMode="numeric"
                autoComplete={i === 0 ? 'one-time-code' : 'off'}
                maxLength={1}
                value={d}
                onFocus={() => setFocused(i)}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !d && i > 0) refs.current[i - 1]?.focus();
                }}
                className={`h-16 min-w-0 rounded-md bg-surface-100 text-center font-display text-[28px] font-extrabold text-white outline-none ${
                  focused === i ? 'border-2 border-brand' : 'border border-surface-100'
                }`}
              />
            ))}
          </div>
        </fieldset>
        <div className="mt-5 flex items-center justify-between text-[15px] text-white/60">
          <span>Didn't get it?</span>
          <button
            type="button"
            disabled={seconds > 0}
            onClick={() => setSeconds(24)}
            className={`h-11 bg-transparent p-0 text-[15px] ${seconds > 0 ? 'font-medium text-white/60' : 'font-bold text-white underline'}`}
          >
            {seconds > 0 ? `Resend in 0:${String(seconds).padStart(2, '0')}` : 'Resend code'}
          </button>
        </div>
        <div className="absolute bottom-7 left-5 right-5">
          <PrimaryButton disabled={!complete} onClick={() => navigate('/onboarding/city')}>
            Verify
          </PrimaryButton>
        </div>
      </div>
    </Screen>
  );
}

/* ---------- Log in ---------- */

export function Login() {
  const navigate = useNavigate();
  const { completeOnboarding } = useAppState();
  const logIn = () => {
    completeOnboarding();
    navigate('/feed');
  };
  return (
    <Screen>
      <form
        className="h-full px-5 pt-4"
        onSubmit={(e) => {
          e.preventDefault();
          logIn();
        }}
      >
        <BackButton to="/welcome" />
        <PageTitle className="mb-7 mt-5" title="Welcome back" sub="Log in to see your saved events." />
        <div className="flex flex-col gap-4">
          <TextField id="li-email" label="Email" type="email" placeholder="you@example.com" autoComplete="email" />
          <PasswordField id="li-pass" label="Password" placeholder="Your password" autoComplete="current-password" />
          <a href="#forgot" className="flex min-h-11 items-center self-end text-[15px] font-bold text-white underline underline-offset-[3px]">
            Forgot password?
          </a>
        </div>
        <button type="submit" className="mt-3 flex h-[58px] w-full items-center justify-center rounded-full bg-brand text-[17px] font-bold text-on-brand active:scale-[0.98]">
          Log in
        </button>
        <div className="my-6 flex items-center gap-3 text-[13px] text-white/50">
          <span className="h-px flex-1 bg-[#242424]" />
          or
          <span className="h-px flex-1 bg-[#242424]" />
        </div>
        <div className="flex flex-col gap-2.5">
          <SecondaryButton onClick={logIn}>Continue with Apple</SecondaryButton>
          <SecondaryButton onClick={logIn}>Continue with Google</SecondaryButton>
        </div>
        <p className="absolute bottom-9 left-5 right-5 m-0 text-center text-[15px] text-white/70">
          New here?{' '}
          <Link to="/signup" className="font-bold text-white underline underline-offset-[3px]">
            Create an account
          </Link>
        </p>
      </form>
    </Screen>
  );
}
