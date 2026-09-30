import { Navigate, Route, Routes } from 'react-router-dom';
import { Login, Signup, Splash, Verify, Welcome } from './pages/Auth';
import { OnboardingBudget, OnboardingCity, OnboardingInterests } from './pages/Onboarding';
import { EventDetail, Feed, Saved, SearchPage, You } from './pages/Main';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/login" element={<Login />} />
      <Route path="/onboarding/city" element={<OnboardingCity />} />
      <Route path="/onboarding/interests" element={<OnboardingInterests />} />
      <Route path="/onboarding/budget" element={<OnboardingBudget />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/event/:id" element={<EventDetail />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/you" element={<You />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
