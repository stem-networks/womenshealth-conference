import { Suspense } from 'react';
import RegisterDetailsClient from '../components/RegisterDetails';

export default function RegisterDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterDetailsClient />
    </Suspense>
  );
}