import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export function SignUp() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.description}>This is the Sign-Up page.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    marginTop: 10,
  },
});
