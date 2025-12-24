import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const AddButton = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Task</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 100,
    width: '100%',
  },
  text: {
    color: '#E6E6E6',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default AddButton