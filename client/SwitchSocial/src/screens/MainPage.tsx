import { View, Text, Image, TouchableOpacity, ImageBackground  } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


export function MainPage() {
    const [pressed, setPressed] = React.useState(false);
    const navigation = useNavigation();

  return (
    <>
    <View  style={{
        flex: 1,
        // justifyContent: 'center', 
        alignItems: 'center', 
      }}>
      <Image
          source={require('../assets/char.png')}  
          style={{ width: 350, height: 350, marginTop: 100 }} 
        />
        <Text style={{ color: 'white', fontSize:50, fontWeight: "900" }}>Express your{'\n'} creativity</Text>
        <Text style= {{color: 'white', fontSize:20}}>Lorem ipsum dolor sit amet consectetur {'\n'}elit.{'\n'}
        Nulla enim laborum, nam quasi error{'\n'}eius nihil! Iusto tenetur, nihil dicta sequi</Text>

        <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')} // Navigate to SignUp screen
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
      >        {/* <Image source={require('../assets/Rectangle.png')}/> */}
        <ImageBackground source={require('../assets/Rectangle.png')} style={{width: 200, height: 100, justifyContent: 'center', alignItems: 'center',  opacity: pressed ? 0.7 : 1, transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }] }}    resizeMode="contain" >        
         <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Get Started</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
    </>
    
  );
}

