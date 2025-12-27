import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import React, { useContext } from "react";
import { Sun, SunDim } from "lucide-react-native";
import { ThemeContext } from "../context/ThemeContext";

const Nav = () => {
  const { colors, toggleTheme } = useContext(ThemeContext);
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hi Muksit,</Text>
      <Pressable onPress={toggleTheme}>
        <Sun color="black" size={40} />
      </Pressable>
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
      padding: 20,
      borderRadius: 100,
      width: "90%",
      elevation: 4,
    },
    text: {
      color: "black",
      fontSize: 30,
      fontWeight: "500",
    },
  });

export default Nav;
