import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
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
  fetchedComments: any[];
}

interface Comment {
  _id: string;
  user: {
    _id: string;

  };
  username: string;
  content: string;
  likes: string[];
}

interface CommentData {
  _id: string;
  user: {
    _id: string;
    username: string;
    profilePicture?: string;
  };
  content: string;
  likes: string[];
  createdAt: string;
}


interface User {
  _id: string;
  username: string;
}

export function FeedScreen() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [visibleComments, setVisibleComments] = useState<{ [key: string]: boolean }>({});
  const [newComments, setNewComments] = useState<{ [key: string]: string }>({});

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
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URI}/likes/post/${postId}`, {
        method: 'POST',
        headers: { 'x-auth-token': token || '' }
      });

      if (response.ok) {
        // Update the likes count locally
        setPosts(prevPosts => prevPosts.map(post =>
          post._id === postId
            ? { ...post, likes: [...(post.likes || []), currentUser?._id].filter(Boolean) }
            : post
        ));
      } else {
        const data = await response.json();
        Alert.alert('Error', `Failed to like post: ${data.message}`);
      }
    } catch (error) {
      console.error('Error liking post:', error);
      Alert.alert('Error', 'An error occurred while liking the post');
    }
  };
  const handleComment = async (postId: string) => {
    setVisibleComments(prev => ({ ...prev, [postId]: !prev[postId] }));
    if (!visibleComments[postId]) {
      await fetchComments(postId);
    }
  };


  const fetchComments = async (postId: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URI}/comments/${postId}`, {
        headers: { 'x-auth-token': token || '' }
      });
      if (response.ok) {
        const comments: CommentData[] = await response.json();
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post._id === postId ? { ...post, fetchedComments: comments } : post
          )
        );
      } else {
        throw new Error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      Alert.alert('Error', 'Failed to load comments');
    }
  };
  const addComment = async (postId: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const content = newComments[postId];
      if (!content) return;

      const response = await fetch(`${BASE_URI}/comments/${postId}`, {
        method: 'POST',
        headers: {
          'x-auth-token': token || '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
      });

      if (response.ok) {
        setNewComments(prev => ({ ...prev, [postId]: '' }));
        await fetchComments(postId);
      } else {
        throw new Error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      Alert.alert('Error', 'Failed to add comment');
    }
  };

  const likeComment = async (commentId: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URI}/likes/comment/${commentId}`, {
        method: 'POST',
        headers: { 'x-auth-token': token || '' }
      });

      if (response.ok) {
        await fetchFeed(token || '');
      } else {
        throw new Error('Failed to like comment');
      }
    } catch (error) {
      console.error('Error liking comment:', error);
      Alert.alert('Error', 'Failed to like comment');
    }
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
                <Text style={styles.actionText}>{post.likes?.length || 0}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleComment(post._id)} style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={24} color="white" />
                <Text style={styles.actionText}>{post.comments?.length || 0}</Text>
              </TouchableOpacity>
              {currentUser && currentUser._id === post.user && (
                <TouchableOpacity onPress={() => handleDelete(post._id)} style={styles.actionButton}>
                  <Ionicons name="trash-outline" size={24} color="white" />
                </TouchableOpacity>
              )}
            </View>

            {visibleComments[post._id] && (
              <View style={styles.commentsSection}>
                {post.fetchedComments?.map((comment) => (
                  <View key={comment._id} style={styles.comment}>
                    <Text style={styles.commentUsername}>{comment.user.username}</Text>
                    <Text style={styles.commentContent}>{comment.content}</Text>
                    <TouchableOpacity onPress={() => likeComment(comment._id)} style={styles.likeCommentButton}>
                      <Ionicons name="heart-outline" size={16} color="white" />
                      <Text style={styles.likeCommentText}>{comment.likes?.length || 0}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                <View style={styles.addCommentSection}>
                  <TextInput
                    style={styles.commentInput}
                    value={newComments[post._id] || ''}
                    onChangeText={(text) => setNewComments(prev => ({ ...prev, [post._id]: text }))}
                    placeholder="Add a comment..."
                    placeholderTextColor="#999"
                  />
                  <TouchableOpacity onPress={() => addComment(post._id)} style={styles.addCommentButton}>
                    <Ionicons name="send" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
  commentsSection: {
    marginTop: 10,
  },
  comment: {
    marginBottom: 5,
  },
  commentUsername: {
    color: 'white',
    fontWeight: 'bold',
  },
  commentContent: {
    color: 'white',
  },
  likeCommentButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCommentText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 12,
  },
  addCommentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  addCommentButton: {
    padding: 5,
  },
});