import React, { useState } from 'react';
import { View, Text, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { NavigationBar } from '../screens/NavigationBar';

export function CreatePost() {
  

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/walletconnect.png')} style={styles.background} resizeMode="cover">
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Text style={{ color: 'white', fontSize: 24 }}>Gallery</Text>

          {/* Button to pick images */}
          <TouchableOpacity style={styles.pickButton}>
            <Text style={{ color: 'white' }}>Pick Images from Gallery</Text>
          </TouchableOpacity>

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
  pickButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  galleryPhotos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  photo: {
    width: '30%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
});
