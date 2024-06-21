"use client";

import { useFormStatus } from "react-dom";

const SubmitBtn = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="btn btn-outline w-fit">
      {children}
    </button>
  );
};

export default SubmitBtn;
