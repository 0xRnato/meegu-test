interface IModalProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ children, id, title }: IModalProps) {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          {children}
        </div>
      </div>
    </>
  );
}
