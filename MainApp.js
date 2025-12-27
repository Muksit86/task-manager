import { Pressable, StyleSheet, View, Modal, FlatList } from "react-native";
import Nav from "./components/Nav";
import Task from "./components/Task";
import AddButton from "./components/AddButton";
import { useContext, useEffect, useState } from "react";
import AddTaskMenu from "./components/AddTaskMenu";
import { TaskContext } from "./context/TaskContext.js";
import { ThemeContext } from "./context/ThemeContext.js";
import { getAllTasks, initDb } from "./database/TaskDb.js";

export default function MainApp() {
  const { colors } = useContext(ThemeContext);
  const styles = getStyles(colors);

  const [addTaskMenu, setaddTaskMenu] = useState(false);
  const { tasks } = useContext(TaskContext);

  const onPressFunction = () => {
    setaddTaskMenu(!addTaskMenu);
  };

  return (
    <View style={styles.container}>
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
    checkBorder: {
      borderWidth: 1,
      borderColor: "green",
    },

    container: {
      flex: 1,
      backgroundColor: colors.background,
      borderWidth: 1,
      gap: 20,
      width: "100%",
      paddingVertical: 50,
      position: "relative",
      borderWidth: 1,
      borderColor: "green",
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
