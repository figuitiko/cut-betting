"use client";
import Modal from "../modal";
import { useFormState } from "react-dom";
import { updateGame } from "@/lib/actions";
import SubmitBtn from "../submit-btn";
import useToastForm from "@/hooks/useToastForm";

const FormEditGames = (id: string) => {
  const { formRef, setShowToast, showToast } = useToastForm();
  const [state, dispatch] = useFormState(updateGame, undefined);

  return (
    <div className="flex">
      <Modal btnText={"pon ganador"}>
        <form
          ref={formRef}
          action={(formData) => {
            dispatch(formData);
            setShowToast(true);
            formRef?.current?.reset();
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            name="id"
            placeholder="id"
            hidden
            className="input input-bordered w-full max-w-xs"
            required
            value={id}
          />
          <input
            type="text"
            name="teamWinnerName"
            placeholder="id"
            hidden
            className="input input-bordered w-full max-w-xs"
            required
          />
          <SubmitBtn> editar juego </SubmitBtn>
        </form>

        {showToast && (
          <div className="toast toast-success flex gap-4">
            <div className="alert alert-info">
              <span>editado exitosamente</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FormEditGames;
