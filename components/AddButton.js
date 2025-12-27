import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const AddButton = () => {
  const { colors, toggleTheme } = useContext(ThemeContext);
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Task</Text>
    </View>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.primary,
      padding: 20,
      borderRadius: 100,
      width: "100%",
    },
    text: {
      color: "white",
      fontSize: 20,
      fontWeight: "500",
    },
  });

export default AddButton;
