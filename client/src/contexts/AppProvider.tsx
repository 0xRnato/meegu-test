import { UserProvider } from './UserContext';

interface IAppProvider {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: IAppProvider) => {
  return <UserProvider>{children}</UserProvider>;
};
