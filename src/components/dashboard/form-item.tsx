"use client";
import { act } from "react";
import Modal from "../modal";
import SubmitBtn from "../submit-btn";
import useToastForm from "@/hooks/useToastForm";
import { useFormState } from "react-dom";
type formItem = {
  name: string;
  type: string;
  placeholder: string;
};
export type FormStateItems<T> = {
  errors: {
    [K in keyof T]?: string[] | undefined;
  };
};

export type AddItemTypeWithFormItems = {
  formItems?: formItem[];
  action: (
    state: FormStateItems<{ name: string }> | undefined,
    formData: FormData
  ) => Promise<{ errors: { name?: string[] | undefined } } | undefined>;
  successMessage: string;
  btnText: string;
};

const FormItem = ({
  formItems,
  action,
  successMessage,
  btnText,
}: AddItemTypeWithFormItems) => {
  const { formRef, setShowToast, showToast } = useToastForm();
  const [state, dispatch] = useFormState(action, undefined);
  return (
    <div className="flex">
      <Modal btnText={btnText}>
        <form
          ref={formRef}
          action={(formData) => {
            dispatch(formData);
            setShowToast(true);
            formRef?.current?.reset();
          }}
          className="flex flex-col gap-4"
        >
          {formItems?.map((formItem, idx) => (
            <input
              key={idx}
              type={formItem.type}
              name={formItem.name}
              placeholder={formItem.placeholder}
              className="input input-bordered w-full max-w-xs"
              required
            />
          ))}
          <SubmitBtn>{btnText} </SubmitBtn>
        </form>

        {showToast && (
          <div className="toast toast-success flex gap-4">
            <div className="alert alert-info">
              <span>{successMessage}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FormItem;
