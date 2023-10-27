import { useContext, useState, createContext } from "react";
import { user } from "./user";

type props = {
  obj: user;
};
interface UserContextType {
  user: user | null;
  setUser: (user: user | null) => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC = () => {
  const [user, setUser] = useState<user | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}></UserContext.Provider>
  );
};
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
