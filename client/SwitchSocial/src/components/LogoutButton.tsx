import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

export default function LogoutButton (){
  const navigation = useNavigation();
  

  return (
    <View >
        <TouchableOpacity style={styles.container} onPress={async()=>{
           await AsyncStorage.setItem("token","");
           await AsyncStorage.setItem("email","");
           await AsyncStorage.setItem("password","");
            navigation.navigate("MainPage")
        }}>
            <Text style={{ color:'white', }}>Logout</Text>
        </TouchableOpacity>
        
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
       backgroundColor: 'rgba(128, 128, 128, 0.5)',
        width:100,
        height:50,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:21,
       
        
    }
})