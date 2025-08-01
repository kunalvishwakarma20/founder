'use client';

import { SignedIn } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/loading-spinner';

const DashboardSideBar = dynamic(() => import('./(sidebar)/DashboardSideBar'), {
  ssr: false,
  loading: () => <div className="w-64 h-screen bg-gray-100 animate-pulse" />
});

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SignedIn>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<Spinner />}>
          <DashboardSideBar />
        </Suspense>
        <main className="md:ml-64">
          <Suspense fallback={<Spinner />}>
            {children}
          </Suspense>
        </main>
      </div>
    </SignedIn>
  );
}