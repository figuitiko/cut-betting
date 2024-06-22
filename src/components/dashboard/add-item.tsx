"use client";
import useToastForm from "@/hooks/useToastForm";
import React from "react";
import Modal from "../modal";
import SubmitBtn from "../submit-btn";
import FormItem, { AddItemTypeWithFormItems } from "./form-item";

type AddItemTypeWithChildren = {
  children: React.ReactNode;

  successMessage: string;
  btnText: string;
};

type AddItemProps = AddItemTypeWithChildren | AddItemTypeWithFormItems;

const AddItem = (props: AddItemProps) => {
  const { showToast } = useToastForm();
  if ("children" in props) {
    const { children, successMessage, btnText } = props;
    return (
      <div className="flex">
        <Modal btnText={btnText}>
          {children}
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
  }
  const { formItems, action, successMessage, btnText } = props;
  return (
    <FormItem
      formItems={formItems}
      action={action}
      successMessage={successMessage}
      btnText={btnText}
    />
  );
};

export default AddItem;
