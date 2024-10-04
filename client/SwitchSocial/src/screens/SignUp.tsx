import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

export function SignUp() {
  const navigation = useNavigation();
  const [username, setUsername] = useState(''); // Updated state handler
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.0.225:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Registration Successful', 'Please log in.');
        // Navigate to SignIn screen after successful registration
        navigation.navigate('SignIn');
      } else {
        // If registration fails, show the specific message returned by the server
        Alert.alert('Registration Failed', `Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('Registration Failed', 'Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Signupbg.png')}
        style={styles.background}
        resizeMode="cover">
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Image source={require('../assets/Human.png')} style={{ alignSelf: 'flex-end', marginTop: 20 }} />
          <Text style={styles.title}>Hello User!</Text>
          <Text style={{ color: 'white', fontSize: 20, marginTop: 10 }}>Welcome to Switch Social</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ color: 'white', fontSize: 20, marginRight: 120 }}> Sign up</Text>
            <Image style={{}} source={require('../assets/verifieduser.png')} />
          </View>
          <View style={{ width: '100%', marginTop: 20 }}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="white"
              keyboardType="default"
              onChangeText={setUsername}
            />
            <Text style={styles.label}>Email Id</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="white"
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="white"
              secureTextEntry={true}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity onPress={handleRegister}>
            <ImageBackground
              source={require('../assets/Rectangle33.png')}
              style={styles.button}
              resizeMode="contain">
              <Text style={styles.buttonText}>Sign Up</Text>
            </ImageBackground>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={{ color: 'white', fontSize: 10, alignSelf: 'flex-end' }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.loginText}>Login </Text>
            </TouchableOpacity>
          </View>

          <Text style={{ color: 'white' }}>_____ Or Continue with ______</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate('WalletConnect')}>
              <ImageBackground
                source={require('../assets/iconbg.png')}
                style={styles.iconBackground}
                resizeMode="contain">
                <Image source={require('../assets/Google.png')} style={styles.iconImage} resizeMode="contain" />
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('WalletConnect')}>
              <ImageBackground
                source={require('../assets/iconbg.png')}
                style={styles.iconBackground}
                resizeMode="contain">
                <Image source={require('../assets/Phantom.png')} style={styles.iconImage} resizeMode="contain" />
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  loginText: {
    color: 'blue',
    textDecorationLine: 'none',
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  input: {
    height: 40,
    backgroundColor: '#181818',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    color: 'white',
    marginBottom: 10,
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    elevation: 5,
  },
  button: {
    width: 240,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  iconBackground: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 40,
    height: 60,
  },
});
