'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import userService from '../services/userService';
import { ICreateUser, IUpdateUser, IUser } from '@/types/user';

interface IUserContext {
  users: IUser[];
  userToDelete: IUser;
  setUserToDelete: React.Dispatch<React.SetStateAction<IUser>>;
  loading: boolean;
  createUser: (userData: ICreateUser) => Promise<void>;
  getAllUsers: () => Promise<void>;
  getUserById: (userId: number) => Promise<IUser>;
  updateUser: (userId: number, userData: IUpdateUser) => Promise<void>;
  deleteUser: (userId: number) => Promise<void>;
}

const UserContext = createContext({} as IUserContext);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState<IUser>({
    id: 0,
    name: '',
    birthdate: '',
    document: '',
    acceptedTermsAndConditions: false,
    zipcode: '',
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    createdAt: '',
    updatedAt: '',
  });

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
    setUsers((prevUsers) => [...prevUsers, user]);
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
    setLoading(false);
    return user;
  };

  const updateUser = async (userId: number, userData: IUpdateUser) => {
    setLoading(true);
    const user = await userService.update(userId, userData);
    setUsers((prevUsers) => prevUsers.map((prevUser) => (prevUser.id === userId ? user : prevUser)));
    setLoading(false);
  };

  const deleteUser = async (userId: number) => {
    setLoading(true);
    await userService.delete(userId);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setLoading(false);
  };

  const value = {
    users,
    userToDelete,
    setUserToDelete,
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
