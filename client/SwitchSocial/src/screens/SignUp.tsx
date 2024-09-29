import { View, Text, StyleSheet, ImageBackground, Image,TouchableOpacity,  TextInput, ScrollView,  KeyboardAvoidingView  } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook



export function SignUp() {
  const navigation = useNavigation();
  return (
    
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Signupbg.png')}
        style={styles.background}
        resizeMode="cover">
             <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">

             <Image source={require('../assets/Human.png')} style={{ alignSelf: 'flex-end', marginTop: 20}}/>
        <Text style={styles.title}>Hello User!</Text>
        <Text style={{color: 'white', fontSize:20, marginTop: 10}}>Welcome to Switch Social</Text>
        <View style= {{flexDirection: 'row',  alignItems: 'center', marginTop: 20,}}>
        <Text style={{color: 'white', fontSize:20, marginRight: 100}}> Sign UP</Text>
        <Image style={{}} source={require('../assets/verifieduser.png')}/>
        </View>
        <View style={{    width: '100%', // Width of input fields
    marginTop: 20,}}>
        <Text style={styles.label}>Mobile No</Text>
        <TextInput style={styles.input} placeholder="Enter your mobile number" placeholderTextColor="white" keyboardType="phone-pad" />
        <Text style={styles.label}>Email Id</Text>
          <TextInput style={styles.input} placeholder="Enter your email" placeholderTextColor="white" keyboardType="email-address" />
          
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder="Enter your password" placeholderTextColor="white" secureTextEntry={true} />
        </View>

        <TouchableOpacity
        //  onPress={() => navigation.navigate('SignUp')}
        // onPressIn={() => setPressed(true)}
        // onPressOut={() => setPressed(false)}
      >
        <ImageBackground source={require('../assets/Rectangle33.png')} style={{
          width: 240, height: 100,
          justifyContent: 'center',
          alignItems: 'center',
        //   opacity: pressed ? 0.7 : 1,
        //   transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }]
        }} resizeMode="contain">
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Sign Up</Text>
        </ImageBackground>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
          <Text style={{color: 'white', fontSize: 10, alignSelf: 'flex-end'}}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text style={{color: 'white'}}>_____ Or Continue with ______</Text>
        <View style= {{flexDirection: 'row',  alignItems: 'center', marginTop: 20,}}>
            <ImageBackground source={require('../assets/iconbg.png')} style={{width: 60, height:60,  alignItems: 'center', justifyContent: 'center'}} resizeMode="contain">
            <Image source={require('../assets/Google.png')} style={{width: 40, height:60,}}  resizeMode="contain"/>
            </ImageBackground>
            <TouchableOpacity onPress={() => navigation.navigate('WalletConnect')}>
            <ImageBackground source={require('../assets/iconbg.png')} style={{width: 60, height:60,  alignItems: 'center', justifyContent: 'center'}} resizeMode="contain">
            <Image source={require('../assets/Phantom.png')} style={{width: 40, height:60,}}  resizeMode="contain"/>
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
    marginTop: 10
  },
  loginContainer: {
    flexDirection: 'row',
     alignSelf: 'flex-end',
     marginRight:10
  },
  loginText: {
    color: 'blue', // Color for the Login text
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
});
