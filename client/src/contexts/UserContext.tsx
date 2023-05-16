'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import userService from '../services/userService';
import { ICreateUser, IUser } from '@/types/user';

interface IUserContext {
  users: IUser[];
  createUser: (userData: ICreateUser) => Promise<void>;
  getAllUsers: () => Promise<void>;
  getUserById: (userId: number) => Promise<void>;
  updateUser: (userId: number, userData: ICreateUser) => Promise<void>;
  deleteUser: (userId: number) => Promise<void>;
}

const UserContext = createContext({} as IUserContext);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService
      .getAll()
      .then((users) => {
        setUsers(users);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const createUser = async (userData: ICreateUser) => {
    setLoading(true);
    const user = await userService.create(userData);
    setUsers([...users, user]);
    setLoading(false);
  };

  const getAllUsers = async () => {
    setLoading(true);
    const users = await userService.getAll();
    setUsers(users);
    setLoading(false);
  };

  const getUserById = async (userId: number) => {
    setLoading(true);
    const user = await userService.getById(userId);
    setUsers([...users, user]);
    setLoading(false);
  };

  const updateUser = async (userId: number, userData: ICreateUser) => {
    setLoading(true);
    const user = await userService.update(userId, userData);
    setUsers([...users, user]);
    setLoading(false);
  };

  const deleteUser = async (userId: number) => {
    setLoading(true);
    await userService.delete(userId);
    setUsers(users.filter((user) => user.id !== userId));
    setLoading(false);
  };

  const value = {
    users,
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
