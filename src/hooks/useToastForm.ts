"use client";
import React from "react";

const useToastForm = () => {
  const [showToast, setShowToast] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  React.useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);
  return { showToast, setShowToast, formRef };
};

export default useToastForm;
