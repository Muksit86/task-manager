import { View, Text, StyleSheet, Pressable } from "react-native";
import { Calendar, Edit, Pencil } from "lucide-react-native";
import { useState } from "react";
import EditTaskMenu from "./EditTaskMenu";
import { Modal } from "react-native";

const Task = ({ task }) => {
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
              backgroundColor: "#e6e6e6ff",
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1A1A",
    padding: 25,
    borderRadius: 30,
    gap: 15,
    width: "100%",
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
    color: "#E6E6E6",
    fontSize: 30,
    fontWeight: "bold",
  },

  descText: {
    color: "#E6E6E6",
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
