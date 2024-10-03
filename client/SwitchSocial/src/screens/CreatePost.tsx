import React, { useState } from 'react';
import { View, Text, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { NavigationBar } from '../screens/NavigationBar';

export function CreatePost() {
  const [photos, setPhotos] = useState<{ uri: string, type: string, name: string }[]>([]);

  // Function to pick and upload images to the backend
  const pickImages = async () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1, // 1 for a single image at a time
    };

    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Error:', response.errorCode);
      } else if (response.assets) {
        const file = response.assets[0];

        if (file.uri && file.type && file.fileName) {
          const formData = new FormData();
          
          formData.append('photo', {
            uri: file.uri,
            type: file.type,
            name: file.fileName,
          } as any); // cast to `any` for compatibility with FormData in React Native

          try {
            // Upload to backend
            const res = await axios.post('http://localhost:5001/upload', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Save the uploaded image URL
            setPhotos([...photos, { uri: res.data.imageUrl, type: file.type, name: file.fileName }]);
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/walletconnect.png')} style={styles.background} resizeMode="cover">
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Text style={{ color: 'white', fontSize: 24 }}>Gallery</Text>

          {/* Button to pick images */}
          <TouchableOpacity onPress={pickImages} style={styles.pickButton}>
            <Text style={{ color: 'white' }}>Pick Images from Gallery</Text>
          </TouchableOpacity>

          {/* Display uploaded images */}
          <View style={styles.galleryPhotos}>
            {photos.length > 0 ? (
              photos.map((photo, index) => (
                <Image key={index} source={{ uri: photo.uri }} style={styles.photo} />
              ))
            ) : (
              <Text style={{ color: 'white' }}>No photos selected</Text>
            )}
          </View>
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
