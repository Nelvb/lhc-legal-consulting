// src/frontend/app/(auth)/signup/page.tsx
import React from 'react';
import SignupForm from '../../../components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <SignupForm />
    </div>
  );
}