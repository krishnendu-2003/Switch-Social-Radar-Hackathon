import { View, Text, StyleSheet, ImageBackground, Image,TouchableOpacity,  TextInput, ScrollView,  KeyboardAvoidingView  } from 'react-native';
import React from 'react';
import '../screens/NavigationBar'
import { NavigationBar } from '../screens/NavigationBar';

export function Profile() {
  return (
    <View style={styles.container}>
        <ImageBackground
        source={require('../assets/MyProfile.png')}
        style={styles.background}
        resizeMode="cover">
      <NavigationBar/>

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
    // alignItems: 'center',
  },
 
});
