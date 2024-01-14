import { createContext, useContext } from "react";
import { account } from "../models/account";

interface AccountContextType {
  account: account | null;
  setAccount: (account: account | null) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);
function useAccountContext() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
export { useAccountContext, AccountContext };
