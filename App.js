import { useContext, useEffect } from "react";
import { TaskProvider } from "./context/TaskContext";
import { UsernameProvider } from "./context/usernameContext";
import { ThemeProvider } from "./context/ThemeContext";
import MainApp from "./MainApp";
import WelcomeScreen from "./WelcomeScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UsernameContext } from "./context/usernameContext";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { username } = useContext(UsernameContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {username ? (
          <Stack.Screen name="Main" component={MainApp} />
        ) : (
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UsernameProvider>
      <ThemeProvider>
        <TaskProvider>
          <RootNavigator />
        </TaskProvider>
      </ThemeProvider>
    </UsernameProvider>
  );
}
