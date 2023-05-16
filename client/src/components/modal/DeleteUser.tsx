import { useUser } from '@/contexts/UserContext';

interface IDeleteUserProps {
  toggleModal: () => void;
}

export default function DeleteUser({ toggleModal }: IDeleteUserProps) {
  const { userToDelete, deleteUser } = useUser();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await deleteUser(userToDelete.id);
    toggleModal();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
      <div className="form-control">Are you sure you want to delete the user &quot;{userToDelete.name}&quot;?</div>
      <div className="modal-action">
        <button className="btn btn-primary" type="submit">
          Confirm
        </button>
        <label className="btn" onClick={() => toggleModal()}>
          Cancel
        </label>
      </div>
    </form>
  );
}
