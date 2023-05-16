import { IUser } from '@/types/user';

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

export default function UserItem({ user }: { user: IUser }) {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{formatDate(user.birthdate)}</td>
      <td>{user.document}</td>
      <td>
        <input type="checkbox" checked={user.acceptedTermsAndConditions} className="checkbox" disabled />
      </td>
      <td>{user.zipcode}</td>
      <td>{user.street}</td>
      <td>{user.neighborhood}</td>
      <td>{user.city}</td>
      <td>{user.state}</td>
      <td>
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </tr>
  );
}
