import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationBar } from '../screens/NavigationBar';

export function FeedScreen() {
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null);  // State for selected image

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

        {/* Display the selected image */}
        {image && (
          <Image source={{ uri: image }} style={styles.image} />
        )}

        {/* Post */}
        <View style={styles.postContainer}>
          <Image
            source={require('../assets/bk.jpeg')}
            style={styles.postImage}
          />
          <View style={styles.postFooter}>
            <Image
              source={require('../assets/gift.png')}
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
    gap: 100
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
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  postContainer: {
    borderRadius: 60,

    marginVertical: 10,
    padding: 15,

  },
  postImage: {
    
    width: '100%',
    height: 200,
    borderTopLeftRadius: 30,  
    borderTopRightRadius: 30, 
  },
  postFooter: {
    
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#252526',
    borderBottomLeftRadius: 40,  
    borderBottomRightRadius: 40, 

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
    gap:15,

  },
});