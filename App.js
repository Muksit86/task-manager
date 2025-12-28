import { useContext, useEffect, useState } from "react";
import { TaskProvider } from "./context/TaskContext";
import { UsernameProvider } from "./context/usernameContext";
import { ThemeProvider } from "./context/ThemeContext";
import MainApp from "./MainApp";
import WelcomeScreen from "./WelcomeScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Activity } from "lucide-react-native";
import { View } from "react-native";
import { UsernameContext } from "./context/usernameContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const loadUsername = async () => {
      const savedUsername = await AsyncStorage.getItem("username");
      console.log(savedUsername);
      setUsername(savedUsername);
    };
    loadUsername();
  }, []);

  return (
    <UsernameProvider>
      <ThemeProvider>
        <TaskProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {username ? (
                <Stack.Screen name="Main" component={MainApp} />
              ) : (
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </TaskProvider>
      </ThemeProvider>
    </UsernameProvider>
  );
}
