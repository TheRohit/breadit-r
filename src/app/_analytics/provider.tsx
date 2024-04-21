"use client";

import { Session } from "next-auth/core/types";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ReactNode, useEffect } from "react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  });
}

export function CSPostHogProvider({
  children,
  auth,
}: {
  children: ReactNode;
  auth: any;
}) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogAuthWrapper auth={auth}>{children}</PostHogAuthWrapper>
    </PostHogProvider>
  );
}

function PostHogAuthWrapper({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: Session;
}) {
  useEffect(() => {
    if (auth.user) {
      posthog.identify(auth.user.id, {
        email: auth.user.email,
        name: auth.user.username,
      });
    } else if (auth.expires) {
      posthog.reset();
    }
  }, [auth]);

  return children;
}
