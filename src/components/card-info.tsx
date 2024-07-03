import Modal from "./modal";

type CardInfoProps = {
  title: string;
  description: string;
  btnText: string;
  children: React.ReactNode;
};

const CardInfo = ({ title, description, btnText, children }: CardInfoProps) => {
  return (
    <div className="card  w-96 shadow-xl bg-base-300 ">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <Modal btnText={btnText} btnCls="btn-primary btn-outline">
            {children}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
