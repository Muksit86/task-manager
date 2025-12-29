import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import React, { useContext, useState } from "react";
import {
  ArrowDown,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Sun,
  SunDim,
  Trash,
} from "lucide-react-native";
import { ThemeContext } from "../context/ThemeContext";
import { UsernameContext } from "../context/usernameContext";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskContext } from "../context/TaskContext";

const Nav = () => {
  const { colors, toggleTheme } = useContext(ThemeContext);
  const { username, setUsername } = useContext(UsernameContext);
  const { deleteAllTask } = useContext(TaskContext);

  const [isFocus, setIsFocus] = useState(false);

  const styles = getStyles(colors);

  const handleTest = async () => {
    await AsyncStorage.removeItem("username");
    setUsername(null);
  };

  const menuItems = [
    {
      label: "Theme",
      value: "toggleTheme",

      icon: <Sun color="black" size={20} />,
    },
    {
      label: "All Tasks",
      value: "deleteAllTasks",
      icon: <Trash color="white" size={20} />,
      destructive: true,
    },
    {
      label: "Me",
      value: "deleteUser",
      icon: <Trash color="white" size={20} />,
      destructive: true,
    },
  ];

  const handleMenuAction = (item) => {
    switch (item.value) {
      case "toggleTheme":
        toggleTheme();
        break;

      case "deleteAllTasks":
        // call your delete all tasks logic
        deleteAllTask();
        break;

      case "deleteUser":
        // call your delete user logic
        handleTest();
        deleteAllTask();
        break;

      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hi {username},</Text>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        data={menuItems}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        value="value"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        renderItem={(item) => (
          <View
            style={[
              styles.item,
              item.destructive && {
                backgroundColor: "hsla(0, 100%, 68%, 1.00)",
              },
            ]}
          >
            {item.icon && <View>{item.icon}</View>}
            <Text
              style={[
                styles.textItem,
                item.destructive && {
                  color: "hsla(0, 0%, 100%, 1.00)",
                },
              ]}
            >
              {item.label}
            </Text>
          </View>
        )}
        renderRightIcon={() =>
          isFocus ? (
            <ChevronUp color="black" size={26} />
          ) : (
            <ChevronDown color="black" size={26} />
          )
        }
        onChange={handleMenuAction}
      />
    </View>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "white",
      padding: 15,
      borderRadius: 30,
      width: "90%",
      elevation: 4,
    },
    text: {
      color: "black",
      fontSize: 30,
      fontWeight: "500",
    },
    dropdown: {
      height: 40,
      borderColor: "transparent",
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
      backgroundColor: "hsla(0, 0%, 90%, 1.00)",
    },

    dropdownContainer: {
      borderRadius: 5,
      backgroundColor: "#fff",
      padding: 8,
      elevation: 6, // Android shadow
      shadowColor: "#000", // iOS shadow
      shadowOpacity: 0.15,
      shadowRadius: 10,
      width: 200,
      left: 190,
      shadowOffset: { width: 0, height: 4 },
    },

    textItem: {
      fontSize: 20,
    },

    item: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginVertical: 10,
      borderRadius: 5,
      padding: 10,
      backgroundColor: "hsla(0, 0%, 90%, 1.00)",
    },
  });

export default Nav;
