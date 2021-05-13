import Loader from '@/components/Loader';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function index() {
  const router = useRouter();
  useEffect(() => {
    router.push({ pathname: 'delhi', query: { p: 'get' } });
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader show={true} />
      </div>
    </>
  );
}
