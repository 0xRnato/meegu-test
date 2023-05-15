import { ICreateUser, IUpdateUser, IUser } from '@/types/user';
import api from './api';

const createUser = async (userData: ICreateUser): Promise<IUser> => {
  const { data: result } = await api.post('/user', userData);
  return result.data;
};

const getUsers = async (): Promise<IUser[]> => {
  const { data: result } = await api.get('/user');
  return result.data;
};

const getUserById = async (userId: number): Promise<IUser> => {
  const { data: result } = await api.get(`/user/${userId}`);
  return result.data;
};

const updateUser = async (userId: number, userData: IUpdateUser): Promise<IUser> => {
  const { data: result } = await api.patch(`/user/${userId}`, userData);
  return result.data;
};

const deleteUser = async (userId: number): Promise<void> => {
  await api.delete(`/user/${userId}`);
};

export { createUser, getUsers, getUserById, updateUser, deleteUser };
