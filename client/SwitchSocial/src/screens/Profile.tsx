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
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <Image source={require('../assets/bell.fill.png')} style={{}}/>
            <Text style={{color: 'white'}}>My Profile</Text>
            <Image source={require('../assets/ProfilePhoto.jpeg')} style={{width: 200,height: 200,borderRadius: 100, 
            borderWidth: 2,}}/>

        </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20, 
  },
 
});
