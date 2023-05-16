import { TrashIcon, PencilSquareIcon } from '@heroicons/react/20/solid';

import { IUser } from '@/types/user';
import { useUser } from '@/contexts/UserContext';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
  return formattedDate;
};

interface IUserItemProps {
  user: IUser;
  toggleDeleteUserModal: () => void;
}

export default function UserItem({ user, toggleDeleteUserModal }: IUserItemProps) {
  const { setUserToDelete } = useUser();

  const handleDeleteUser = () => {
    setUserToDelete(user);
    toggleDeleteUserModal();
  };

  return (
    <tr>
      <td>{user.name}</td>
      <td>{formatDate(user.birthdate)}</td>
      <td>{user.document}</td>
      <td>
        <input type="checkbox" checked={user.acceptedTermsAndConditions} className="checkbox" disabled />
      </td>
      <td>{user.zipcode}</td>
      <td>
        <div className="flex">
          <PencilSquareIcon className="h-5 w-5 m-2" />
          <label htmlFor="delete-user-modal" onClick={handleDeleteUser}>
            <TrashIcon className="btn-ghost h-5 w-5 m-2" />
          </label>
        </div>
      </td>
    </tr>
  );
}
