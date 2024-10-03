import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export function SignIn() {
  const navigation = useNavigation();
  const [email, getEmail] = useState('');
  const [password, getPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.0.225:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const { token } = data;

      // You can save the token using AsyncStorage (or SecureStore for better security)
      Alert.alert('Login Successful', `Token: ${token}`);
      // Navigate to the FeedScreen after login
      navigation.navigate('FeedScreen');
    } catch (error) {
      console.error('Error login user:', error);
      Alert.alert('Login Failed', 'Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Signupbg.png')}
        style={styles.background}
        resizeMode="cover">
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Text style={{ color: 'white', fontSize: 30 }}>SIGN IN HERE!</Text>
          <Text style={styles.label}>Email Id</Text>
          <TextInput style={styles.input} placeholder="Enter your email" placeholderTextColor="white" keyboardType="email-address" onChangeText={getEmail} />
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="Enter your password" placeholderTextColor="white" secureTextEntry={true} onChangeText={getPassword} />
          <TouchableOpacity onPress={handleRegister}>
            <ImageBackground source={require('../assets/Rectangle33.png')} style={styles.button} resizeMode="contain">
              <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>Sign In</Text>
            </ImageBackground>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, alignItems: 'center' },
  scrollContainer: { flexGrow: 1, alignItems: 'center', paddingBottom: 20 },
  label: { color: 'white', fontSize: 16, marginBottom: 5 },
  input: {
    height: 40, backgroundColor: '#181818', borderWidth: 1, borderRadius: 20, paddingLeft: 10, color: 'white',
    marginBottom: 10, shadowColor: 'white', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 3.5, elevation: 5,
  },
  button: { width: 240, height: 100, justifyContent: 'center', alignItems: 'center' },
});
