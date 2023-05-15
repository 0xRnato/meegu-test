'use client'

import { createContext, useContext, useEffect, useState } from 'react';

import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../services/userService';
import { ICreateUser, IUser } from '@/types/user';

interface IUserContext {
  users: IUser[];
  createUser: (userData: ICreateUser) => Promise<IUser>;
  getUsers: () => Promise<IUser[]>;
  getUserById: (userId: number) => Promise<IUser>;
  updateUser: (userId: number, userData: ICreateUser) => Promise<IUser>;
  deleteUser: (userId: number) => Promise<void>;
}

const UserContext = createContext({} as IUserContext);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((users) => {
        setUsers(users);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const value = {
    users,
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
