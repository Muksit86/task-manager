import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { use, useContext, useState } from "react";
import { Calendar, Delete, Save, Trash, X } from "lucide-react-native";
import {
  DateTimePicker,
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { TaskContext } from "../context/TaskContext";
import { ThemeContext } from "../context/ThemeContext";

export default function AddTaskMenu({ task, setEditTaskMenu }) {
  const { colors, toggleTheme } = useContext(ThemeContext);
  const styles = getStyles(colors);

  const { tasks, setTask } = useContext(TaskContext);

  const [editTask, seteditTask] = useState({
    id: task.id,
    date: task.date,
    title: task.title,
  });

  const openDatePicker = () => {
    if (Platform.OS !== "android") return;

    DateTimePickerAndroid.open({
      value: new Date(),
      mode: "date",
      display: "default",
      minimumDate: new Date(),
      is24Hour: true,
      onChange: (event, selectedDate) => {
        if (event.type === "set" && selectedDate) {
          seteditTask((prev) => ({
            ...prev,
            date: selectedDate,
          }));
        }
      },
    });
  };

  const handleSaveTask = () => {
    if (editTask.title.trim().length > 0 && !editTask.date) {
      Alert.alert("Missing title", "Task title is required");
      return;
    }

    setTask((prevTasks) =>
      prevTasks.map((t) => (t.id === editTask.id ? editTask : t))
    );
    setEditTaskMenu(false);
  };

  const handleDeleteTask = (id) => {
    setTask((prevTasks) => prevTasks.filter((t) => t.id !== id));
    setEditTaskMenu(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsView}>
        <Pressable
          style={styles.closeButton}
          onPress={() => setEditTaskMenu(false)}
        >
          <X size={40} color="white" />
        </Pressable>

        <Pressable
          style={styles.closeButton}
          onPress={() => handleDeleteTask(task.id)}
        >
          <Trash size={40} color="white" />
        </Pressable>

        <Pressable onPress={handleSaveTask} style={styles.saveButton}>
          <Save size={40} color="white" />
        </Pressable>
      </View>

      <TextInput
        value={editTask.title}
        onChangeText={(text) =>
          seteditTask((prev) => ({
            ...prev,
            title: text,
          }))
        }
        style={styles.titleInput}
        multiline
        placeholder="Enter your task"
      />

      <Pressable onPress={openDatePicker} style={styles.addCalenderBtn}>
        <Calendar color="white" size={30} />
        <Text style={styles.addCalenderText}>Add Date</Text>
      </Pressable>
    </View>
  );
}

const getStyles = (colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.createTaskBackground,
      width: "80%",
      borderRadius: 50,
      padding: 10,
    },

    buttonsView: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
    },

    saveButton: {
      backgroundColor: "black",
      padding: 20,
      borderRadius: 100,
    },

    closeButton: {
      backgroundColor: "#FF6262",
      padding: 20,
      borderRadius: 100,
    },

    titleInput: {
      borderWidth: 1,
      borderColor: "gray",
      backgroundColor: colors.createTaskBackground,
      height: 300,
      fontSize: 20,
      marginVertical: 20,
      textAlignVertical: "top",
      padding: 10,
      marginBottom: 35,
    },

    addCalenderBtn: {
      width: "60%",
      marginHorizontal: "auto",
      backgroundColor: "black",
      borderRadius: 100,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      padding: 20,
    },

    addCalenderText: {
      fontSize: 24,
      color: "white",
    },
  });
