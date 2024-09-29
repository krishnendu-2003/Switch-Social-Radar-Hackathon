import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import '../screens/NavigationBar'
import { NavigationBar } from '../screens/NavigationBar';

export function Profile() {
  return (
    <View style={styles.container}>
      <NavigationBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
});
