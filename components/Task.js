import { View, Text, StyleSheet, Pressable } from "react-native";
import { Calendar, Edit, Pencil } from "lucide-react-native";
import { useContext, useState } from "react";
import EditTaskMenu from "./EditTaskMenu";
import { Modal } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const Task = ({ task }) => {
  const { colors, toggleTheme } = useContext(ThemeContext);
  const styles = getStyles(colors);

  const [editTaskMenu, setEditTaskMenu] = useState(false);

  const data = task.date;
  const date = new Date(data).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  const handleEditTask = () => {
    setEditTaskMenu(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <View style={styles.calenderDiv}>
          <Calendar color="white" />
          <Text style={styles.text}>{date}</Text>
        </View>
        <Pressable onPress={handleEditTask}>
          <View
            style={{
              padding: 5,
              backgroundColor: colors.background,
              borderRadius: 10,
            }}
          >
            <Pencil color="black" />
          </View>
        </Pressable>
      </View>
      <Text style={styles.descText}>{task.title}</Text>

      <Modal visible={editTaskMenu} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <EditTaskMenu task={task} setEditTaskMenu={setEditTaskMenu} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.taskBackground,
      padding: 25,
      borderRadius: 30,
      gap: 15,
      width: "100%",
      borderWidth: 1,
      borderColor: colors.borderColor,
      elevation: 2,
    },

    dateContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "transparent",
    },

    calenderDiv: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
    },

    text: {
      color: colors.text,
      fontSize: 30,
      fontWeight: "bold",
    },

    descText: {
      color: colors.text,
      fontSize: 20,
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.7)", // dim background
    },

    modalContainer: {
      position: "absolute",
      top: "20%",
      left: 0,
      right: 0,
      alignItems: "center",
    },
  });

export default Task;
