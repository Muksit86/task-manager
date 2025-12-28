import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
export const UsernameContext = createContext();

export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const Username = async () => {
      const savdedUser = await AsyncStorage.getItem("username");
      setUsername(savdedUser);
    };

    Username();
  }, []);

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};
