import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { Save } from "lucide-react-native";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UsernameContext } from "./context/usernameContext";

const WelcomeScreen = () => {
  const { setUsername } = useContext(UsernameContext);
  const [nameInput, setNameInput] = useState('')
  const { colors } = useContext(ThemeContext);
  const styles = getStyles(colors);

  const handleSaveName = async () => {
    try {
      await AsyncStorage.setItem("username", nameInput);
      setUsername(nameInput)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.conatiner}>
      <View style={styles.menuContainer}>
        <View style={styles.buttonsView}>
          <Pressable onPress={handleSaveName} style={styles.saveButton}>
            <Save size={40} color="white" />
          </Pressable>
        </View>

        <TextInput
          onChangeText={(text) => setNameInput(text)}
          style={styles.titleInput}
          multiline
          placeholder="Enter your name"
        />
      </View>
    </View>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    conatiner: {
      width: "100%",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
    },

    menuContainer: {
      backgroundColor: colors.taskBackground,
      width: "80%",
      borderRadius: 50,
      padding: 15,
      elevation: 2,
    },

    buttonsView: {
      flexDirection: "row",
      justifyContent: "center",
      padding: 10,
    },

    saveButton: {
      backgroundColor: "black",
      padding: 20,
      borderRadius: 100,
    },

    titleInput: {
      borderWidth: 1,
      borderColor: "gray",
      backgroundColor: colors.taskBackground,
      height: 100,
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

export default WelcomeScreen;
