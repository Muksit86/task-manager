import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { Calendar, Save, X } from "lucide-react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { TaskContext } from "../context/TaskContext";
import { ThemeContext } from "../context/ThemeContext";
import { scheduleTaskNotification } from "../Notificatiions/Notification";

export default function AddTaskMenu({ setaddTaskMenu }) {
  const { colors } = useContext(ThemeContext);
  const styles = getStyles(colors);

  const { addTask } = useContext(TaskContext);

  const [newTask, setNewTask] = useState({
    id: null,
    date: new Date(),
    title: "",
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const openDatePicker = () => {
    if (Platform.OS !== "android") return;

    DateTimePickerAndroid.open({
      value: tomorrow,
      mode: "date",
      display: "default",
      minimumDate: tomorrow,
      is24Hour: true,
      onChange: (event, selectedDate) => {
        if (event.type === "set" && selectedDate) {
          setNewTask((prev) => ({
            ...prev,
            date: selectedDate,
          }));
        }
      },
    });
  };

  const handleSaveTask = async () => {
    if (newTask.title.trim().length === 0) {
      Alert.alert("Missing title", "Task title is required");
      return;
    }
    try {
      await addTask(newTask);
      await scheduleTaskNotification(newTask);
    } catch (error) {
      console.log(error);
    }

    setaddTaskMenu(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsView}>
        <Pressable
          style={styles.closeButton}
          onPress={() => setaddTaskMenu(false)}
        >
          <X size={40} color="white" />
        </Pressable>

        <Pressable onPress={handleSaveTask} style={styles.saveButton}>
          <Save size={40} color="white" />
        </Pressable>
      </View>

      <TextInput
        onChangeText={(text) =>
          setNewTask((prev) => ({ ...prev, title: text }))
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
    checkBorder: {
      borderWidth: 1,
      borderColor: "green",
    },

    container: {
      backgroundColor: colors.taskBackground,
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
      backgroundColor: colors.taskBackground,
      height: 300,
      fontSize: 20,
      marginVertical: 20,
      textAlignVertical: "top",
      padding: 10,
      marginBottom: 35,
      color: "black",
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
