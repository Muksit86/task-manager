import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import React from 'react'
import { Sun, SunDim } from 'lucide-react-native';

const Nav = () => {
  return (
   <View style={styles.container}>
      <Text style={styles.text}>Hi Muksit,</Text>
      <Sun color="white" size={40} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 100,
    width: '90%',
  },
  text: {
    color: '#E6E6E6',
    fontSize: 30,
    fontWeight: '500',
  },
});

export default Nav