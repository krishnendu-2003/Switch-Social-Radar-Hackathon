import { View, Text, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import React from 'react';
import { NavigationBar } from '../screens/NavigationBar';

export function Profile() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/MyProfile.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Image source={require('../assets/bell.fill.png')}  style={{ alignSelf: 'flex-end', margin: 20}}/>
          <Text style={styles.profileTitle}>My Profile</Text>
          <Image source={require('../assets/ProfilePhoto.jpeg')} style={styles.profilePhoto} />
          <Text style={styles.username}>Echo_Whisper._</Text>

        </ScrollView>
        <NavigationBar />
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
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  profileTitle: {
    color: 'white',
    fontSize: 50,

  },
  profilePhoto: {
    width: 150, 
    height: 150, 
    borderRadius: 75, 
    borderWidth: 2,
    margin: 20
  },
  username: {
    color: 'white',
    fontSize: 20,
  },
});
