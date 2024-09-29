import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import React from 'react';

export function SignUp() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Signupbg.png')}
        style={styles.background}
        resizeMode="cover" 
      >
        <Image source={require('../assets/Human.png')}/>
        <Text style={styles.title}>Sign Up</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  background: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});
