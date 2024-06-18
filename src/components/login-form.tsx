"use client";

import { signIn } from "@/app/auth/auth";
import { useFormState, useFormStatus } from "react-dom";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(signIn, undefined);

  return (
    <form action={dispatch} className="space-y-3">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="enter your email"
          className="input w-full max-w-xs"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="enter your password"
          className="input w-full max-w-xs"
          required
        />
      </div>
      <LoginButton />
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {/* {errorMessage && (
          <>
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          </>
        )} */}
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button className="mt-4 w-fit btn btn-primary" aria-disabled={pending}>
      Log in
    </button>
  );
}
