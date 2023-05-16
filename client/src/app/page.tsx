'use client';

import { useState } from 'react';
import CreateUser from '@/components/modal/CreateUser';
import Modal from '@/components/modal/Modal';
import UserList from '@/components/user/UserList';

export default function Home() {
  const [isCreateUserModalOpen, setCreateUserModalOpen] = useState(false);

  const openCreateUserModal = () => {
    setCreateUserModalOpen(true);
  };

  const closeCreateUserModal = () => {
    setCreateUserModalOpen(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="fixed bottom-5 right-5 z-10">
        <label htmlFor="create-user-modal" className="btn btn-primary btn-circle btn-lg" onClick={openCreateUserModal}>
          +
        </label>
      </div>
      <UserList />
      {isCreateUserModalOpen && (
        <Modal id="create-user-modal" title="Create new user">
          <CreateUser modalId="create-user-modal" closeModal={closeCreateUserModal} />
        </Modal>
      )}
    </main>
  );
}
