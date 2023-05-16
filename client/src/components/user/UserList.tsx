'use client';

import { useUser } from '@/contexts/UserContext';
import UserItem from './UserItem';

interface IUserListProps {
  toggleDeleteUserModal: () => void;
}

export default function UserList({ toggleDeleteUserModal }: IUserListProps) {
  const { users } = useUser();

  return (
    <div className="overflow-x-auto shadow-2xl">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>name</th>
            <th>birthdate</th>
            <th>document</th>
            <th>terms</th>
            <th>zipcode</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => <UserItem user={user} key={user.id} toggleDeleteUserModal={toggleDeleteUserModal} />)
          ) : (
            <tr>
              <td colSpan={10}>No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
