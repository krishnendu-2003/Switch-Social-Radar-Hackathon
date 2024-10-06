import { View, Text, StyleSheet, ImageBackground, Image,TouchableOpacity,  TextInput, ScrollView,  KeyboardAvoidingView  } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { ConnectButton, SignInButton } from "../components/sign-in/sign-in-ui";

// import '../screens/Profile';
// import { Profile } from '../screens/Profile';


export function WalletConnect() {
    const navigation = useNavigation();
  return (
    <View  style={styles.container}>
        <ImageBackground  source={require('../assets/walletconnect.png')} style={styles.background}
        resizeMode="cover">
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <ImageBackground source={require('../assets/wclogo.png')} style={{ width:100,height: 100,alignItems: 'center', justifyContent: 'center', marginTop: 200}}>
                <Image source={require('../assets/wcGroup.png')}/>
            </ImageBackground>
            {/* <Text style={{color: 'white', fontSize:30, marginTop:30}}> Enter Your Password</Text> */}
            {/* <TextInput style={styles.input} placeholder="Password" placeholderTextColor="white" secureTextEntry={true} /> */}
            {/* <TouchableOpacity onPress={() => navigation.navigate('FeedScreen')}> */}
            {/* <Text style={styles.label}>Unlock</Text> */}
            <View style={styles.buttonGroup}>
        <ConnectButton />
        <SignInButton />
      </View>
            {/* </TouchableOpacity> */}
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
        // alignItems: 'center',
      },
      scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        // paddingBottom: 20, 
      },
      input: {
        height: 40,
        width:250,
        backgroundColor: '#181818',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        color: 'white', 
        marginBottom: 10, 
        marginTop: 20,
      },
      label: {
        color: 'white',
        fontSize: 16,
        marginBottom: 5,
        backgroundColor: '#443CC7',
        height: 40,
        width: 200,
        textAlign: 'center', // Centers text horizontally
        lineHeight: 40,
        borderRadius: 5, 
        marginTop: 60
      },
      buttonGroup: {
        marginTop: 16,
        flexDirection: "row",
      },
})