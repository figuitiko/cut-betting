"use client";

import { singUp } from "@/app/auth/auth";
import { Span } from "next/dist/trace";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const RegisterButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="btn btn-active btn-primary max-w-fit"
      aria-disabled={pending}
    >
      Register
    </button>
  );
};

const RegisterForm = () => {
  const [data, dispatch] = useFormState(singUp, undefined);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = state;
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  const isReady =
    name &&
    email &&
    password &&
    confirmPassword &&
    password === confirmPassword;
  return (
    <form className="flex flex-col gap-4" action={dispatch}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleOnChange}
          placeholder="Nombre"
          className="input input-bordered w-full max-w-xs"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Correo Electronico</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Correo Electronico"
          className="input input-bordered w-full max-w-xs"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          onChange={handleOnChange}
          value={password}
          placeholder="Contraseña"
          className="input input-bordered w-full max-w-xs"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Confirma Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleOnChange}
          name="confirmPassword"
          placeholder="Confirma Password"
          className="input input-bordered w-full max-w-xs"
          required
        />
      </div>
      {data?.errors?.password && (
        <div className="text-sm text-red-500">
          <p>Password must:</p>
          <ul>
            {data.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      {/* {data?.errors && (
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

      {isReady ? <RegisterButton /> : <p> llena el formulario</p>}
    </form>
  );
};

export default RegisterForm;
