import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationBar } from '../screens/NavigationBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URI } from '../constants';

interface Post {
  _id: string;
  username: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  media?: string;
  likes: string[];
  comments: any[];
  user: string;
}

interface User {
  _id: string;
  username: string;
}

export function FeedScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(`${BASE_URI}/auth/current`);
      const response = await fetch(`${BASE_URI}/auth/user`, {
        headers: { 'x-auth-token': token || '' }
      });
      console.log(response)
      if (response.ok) {

        const user: User = await response.json();
        setCurrentUser(user);
        fetchFeed(token || '');
      } else {
        // navigation.navigate('SignIn'); // Assuming you have a SignIn screen
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
      Alert.alert('Error', 'Failed to fetch user information');
    }
  };

  const fetchFeed = async (token: string) => {
    try {
      const response = await fetch(`${BASE_URI}/posts/feed`, {
        headers: { 'x-auth-token': token }
      });
      if (response.ok) {
        const feedPosts: Post[] = await response.json();
        setPosts(feedPosts);
      } else {
        throw new Error('Failed to fetch feed');
      }
    } catch (error) {
      console.error('Error fetching feed:', error);
      Alert.alert('Error', 'Failed to load feed');
    }
  };

  const handleLike = async (postId: string) => {
    // Implement like functionality
    Alert.alert('Like', `Liked post ${postId}`);
  };

  const handleComment = (postId: string) => {
    // Navigate to comment screen or show comment modal
    Alert.alert('Comment', `Comment on post ${postId}`);
  };

  const handleDelete = async (postId: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URI}/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token || '' }
      });
      if (response.ok) {
        setPosts(posts.filter(post => post._id !== postId));
        Alert.alert('Success', 'Post deleted successfully');
      } else {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      Alert.alert('Error', 'Failed to delete post');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Hello,{'\n'}{currentUser?.username || 'User'}</Text>
          <Image source={require('../assets/gift.png')} style={styles.greetingImage} resizeMode="contain" />
        </View>

        <Text style={styles.sectionTitle}>Your Feed</Text>

        {posts.map((post) => (
          <View key={post._id} style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image
                source={post.userAvatar ? { uri: post.userAvatar } : require('../assets/gift.png')}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.username}>{post.username}</Text>
                <Text style={styles.timestamp}>{new Date(post.createdAt).toLocaleString()}</Text>
              </View>
            </View>
            <Text style={styles.postContent}>{post.content}</Text>
            {post.media && (
              <Image source={{ uri: post.media }} style={styles.postImage} resizeMode="cover" />
            )}
            <View style={styles.postFooter}>
              <TouchableOpacity onPress={() => handleLike(post._id)} style={styles.actionButton}>
                <Ionicons name="heart-outline" size={24} color="white" />
                <Text style={styles.actionText}>{post.likes.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleComment(post._id)} style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={24} color="white" />
                <Text style={styles.actionText}>{post.comments.length}</Text>
              </TouchableOpacity>
              {currentUser && currentUser._id === post.user && (
                <TouchableOpacity onPress={() => handleDelete(post._id)} style={styles.actionButton}>
                  <Ionicons name="trash-outline" size={24} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      <NavigationBar />
    </SafeAreaView>
  );
}

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
    justifyContent: 'space-between',
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
    paddingLeft: 15,
  },
  postContainer: {
    backgroundColor: '#252526',
    borderRadius: 15,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 15,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    fontSize: 12,
  },
  postContent: {
    color: 'white',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    marginLeft: 5,
  },
});