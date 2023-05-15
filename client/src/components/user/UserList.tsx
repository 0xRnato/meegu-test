'use client';

import { useUser } from '@/contexts/UserContext';
import UserItem from './UserItem';

export default function UserList() {
  const { users } = useUser();

  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full">
        {/* head */}
        <thead>
          <tr>
            <th>name</th>
            <th>birthdate</th>
            <th>document</th>
            <th>terms</th>
            <th>zipcode</th>
            <th>street</th>
            <th>neighborhood</th>
            <th>city</th>
            <th>state</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => <UserItem user={user} key={user.id} />)
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
