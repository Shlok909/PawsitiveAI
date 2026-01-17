import { Suspense } from 'react';
import { SignInClient } from './signin-client';

export const dynamic = 'force-dynamic';

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SignInClient />
    </Suspense>
  );
}