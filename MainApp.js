import {
  Pressable,
  StyleSheet,
  View,
  Modal,
  FlatList,
  Button,
} from "react-native";
import Nav from "./components/Nav";
import Task from "./components/Task";
import AddButton from "./components/AddButton";
import { useContext, useEffect, useState } from "react";
import AddTaskMenu from "./components/AddTaskMenu";
import { TaskContext } from "./context/TaskContext.js";
import { ThemeContext } from "./context/ThemeContext.js";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UsernameContext } from "./context/usernameContext.js";
import { dbDeleteTask } from "./database/TaskDb.js";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function MainApp() {
  useEffect(() => {
    async function requestPermission() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission not granted");
      }
    }

    requestPermission();
  }, []);

  const { colors } = useContext(ThemeContext);
  const styles = getStyles(colors);

  const [addTaskMenu, setaddTaskMenu] = useState(false);
  const { tasks } = useContext(TaskContext);
  const { setUsername } = useContext(UsernameContext);

  const onPressFunction = () => {
    setaddTaskMenu(!addTaskMenu);
  };

  const handleTest = async () => {
    await AsyncStorage.removeItem("username");
    setUsername(null);
  };

  return (
    <View style={styles.container}>
      <View>
        <Button title="test" onPress={handleTest} />
      </View>
      <Nav />

      {tasks.length > 0 && (
        <FlatList
          style={styles.flatlist}
          contentContainerStyle={{ gap: 10 }}
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Task task={item} />}
        />
      )}

      <Pressable onPress={onPressFunction} style={styles.addButton}>
        <AddButton />
      </Pressable>

      <Modal visible={addTaskMenu} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <AddTaskMenu
              addTaskMenu={addTaskMenu}
              setaddTaskMenu={setaddTaskMenu}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const getStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      borderWidth: 1,
      gap: 20,
      width: "100%",
      paddingVertical: 50,
      position: "relative",
      alignItems: "center",
    },

    addButton: {
      width: "50%",
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },

    modalContainer: {
      position: "absolute",
      top: "20%",
      left: 0,
      right: 0,
      alignItems: "center",
    },

    flatlist: {
      borderWidth: 1,
      borderColor: "transparent",
      width: "90%",
      flex: 1,
      position: "relative",
    },
  });
