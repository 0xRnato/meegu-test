'use client';

import { useUser } from '@/contexts/UserContext';

export default function Loading() {
  const { loading } = useUser();

  return <>{loading && <progress className="progress progress-primary w-96"></progress>}</>;
}
