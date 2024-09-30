import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { NavigationBar } from '../screens/NavigationBar';

export function FeedScreen() {
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null);  // State for selected image

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SWITCH SOCIAL</Text>
        <TouchableOpacity>
          <Ionicons name="notifications" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Hello,{'\n'}John</Text>
          <Image source={require('../assets/gift.png')} style={styles.greetingImage} resizeMode="contain" />
        </View>

        {/* Stories */}
        <Text style={styles.sectionTitle}>Your Featured Stories</Text>
        <ScrollView horizontal style={styles.storiesContainer}>
          <TouchableOpacity style={styles.addStoryButton} onPress={pickImage}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
          {image && (
            <Image source={{ uri: image }} style={styles.storyImage} />
          )}
        </ScrollView>

        {/* Button to pick an image */}
        <Button title="Pick an image from camera roll" onPress={pickImage} />

        {/* Display the selected image */}
        {image && (
          <Image source={{ uri: image }} style={styles.image} />
        )}

        {/* Post */}
        <View style={styles.postContainer}>
          <Image
            source={{ uri: 'https://example.com/beach-image.jpg' }}
            style={styles.postImage}
          />
          <View style={styles.postFooter}>
            <Image
              source={{ uri: 'https://example.com/james-avatar.jpg' }}
              style={styles.avatar}
            />
            <Text style={styles.username}>James</Text>
            <Text style={styles.timestamp}>1 hour ago</Text>
            <View style={styles.postActions}>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="chatbubble-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="paper-plane-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <NavigationBar />
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1a1a1a',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  greetingText: {
    color: 'white',
    fontSize: 20,
    marginRight: 20,
  },
  greetingImage: {
    width: 150,
    height: 150,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  storiesContainer: {
    paddingVertical: 10,
  },
  addStoryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  storyImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  postContainer: {
    marginVertical: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    color: 'white',
    fontWeight: 'bold',
  },
  timestamp: {
    color: 'gray',
    marginLeft: 'auto',
  },
  postActions: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
});
