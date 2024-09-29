import { View, Text, ImageBackground, ScrollView,StyleSheet } from 'react-native';
import React from 'react';
import { NavigationBar } from '../screens/NavigationBar';


export function CreatePost(){

  return (
    <View style={styles.container}>
        <ImageBackground  source={require('../assets/walletconnect.png')} style={styles.background}
        resizeMode="cover">
 <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
<Text>sfsaf</Text>
            </ScrollView>
            <NavigationBar />
        </ImageBackground>
    </View>
  )
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
        paddingBottom: 20,
      },

  });
  