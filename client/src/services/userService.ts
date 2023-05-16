import { ICreateUser, IUpdateUser, IUser } from '@/types/user';
import api from './api';

const userService = {
  create: async (userData: ICreateUser): Promise<IUser> => {
    const { data: result } = await api.post('/user', userData);
    return result.data;
  },

  getAll: async (): Promise<IUser[]> => {
    const { data: result } = await api.get('/user');
    return result.data;
  },

  getById: async (userId: number): Promise<IUser> => {
    const { data: result } = await api.get(`/user/${userId}`);
    return result.data;
  },

  update: async (userId: number, userData: IUpdateUser): Promise<IUser> => {
    const { data: result } = await api.patch(`/user/${userId}`, userData);
    return result.data;
  },

  delete: async (userId: number): Promise<void> => {
    await api.delete(`/user/${userId}`);
  },
};

export default userService;
