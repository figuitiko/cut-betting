"use client";
import { cn } from "@/lib/util";
import { useRef } from "react";

const Modal = ({
  children,
  btnText = "Abre el Modal",
  btnCls = "",
}: Readonly<{
  children: React.ReactNode;
  btnText?: string;
  btnCls?: string;
}>) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <div className="flex flex-col">
      <button
        className={cn("btn", btnCls)}
        onClick={() => modalRef?.current?.showModal()}
      >
        {btnText}
      </button>
      <dialog ref={modalRef} id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {children}
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
