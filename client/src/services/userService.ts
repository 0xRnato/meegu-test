import { ICreateUser, IUpdateUser, IUser } from '@/types/user';
import api from './api';

const createUser = async (userData: ICreateUser): Promise<IUser> => {
  const { data } = await api.post('/user', userData);
  return data;
};

const getUsers = async (): Promise<IUser[]> => {
  const { data } = await api.get('/user');
  return data;
};

const getUserById = async (userId: number): Promise<IUser> => {
  const { data } = await api.get(`/user/${userId}`);
  return data;
};

const updateUser = async (userId: number, userData: IUpdateUser): Promise<IUser> => {
  const { data } = await api.patch(`/user/${userId}`, userData);
  return data;
};

const deleteUser = async (userId: number): Promise<void> => {
  await api.delete(`/user/${userId}`);
};

export { createUser, getUsers, getUserById, updateUser, deleteUser };
