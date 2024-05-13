import { UserProfile } from '@/components/UserProfile';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Page() {
  const user = await currentUser();
  if (!user || user === undefined) {
    redirect('/sign-in');
  }
  return (
    <section className="flex flex-1 flex-col justify-center items-center">
      <UserProfile
        title="Onboarding"
        buttonTitle="Continue"
        user={{
          user_id: user.id,
          username: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
          avatar_url: user.imageUrl,
          bio: '',
        }}
        description="Embark on your journey with Zen Scroll, where developers converge to exchange insights and foster seamless collaboration."
      />
    </section>
  );
}
