import { createContext, useContext } from "react";
//create contextType to read and set value across the components
interface UserContextType {
  username: string | null;
  setUsername: (username: string | null) => void;
}
//create context to use in parent component
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
//warp the context to use without error
export function useUserContext() {
  const user = useContext(UserContext);

  if (user === undefined) {
    throw new Error("useUserContext must be used with a UserContext");
  }

  return user;
}
