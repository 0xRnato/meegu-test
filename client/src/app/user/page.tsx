'use client';

import { useState } from 'react';
import CreateUser from '@/components/forms/CreateUser';
import DeleteUser from '@/components/forms/DeleteUser';
import Modal from '@/components/modal/Modal';
import UserList from '@/components/user/UserList';

export default function UserPage() {
  const [isCreateUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setDeleteUserModalOpen] = useState(false);

  const toggleCreateUserModal = () => {
    setCreateUserModalOpen(!isCreateUserModalOpen);
  };

  const toggleDeleteUserModal = () => {
    setDeleteUserModalOpen(!isDeleteUserModalOpen);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="fixed bottom-5 right-5 z-10">
        <label
          htmlFor="create-user-modal"
          className="btn btn-primary btn-circle btn-lg"
          onClick={toggleCreateUserModal}
        >
          +
        </label>
      </div>
      <UserList toggleDeleteUserModal={toggleDeleteUserModal} />
      {isCreateUserModalOpen && (
        <Modal id="create-user-modal" title="Create new user">
          <CreateUser toggleModal={toggleCreateUserModal} />
        </Modal>
      )}
      {isDeleteUserModalOpen && (
        <Modal id="delete-user-modal" title="Delete user">
          <DeleteUser toggleModal={toggleDeleteUserModal} />
        </Modal>
      )}
    </main>
  );
}
