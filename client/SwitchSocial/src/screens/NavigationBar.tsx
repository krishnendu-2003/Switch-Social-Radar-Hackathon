import { View, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook


export function NavigationBar() {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/ToolBar.png')}
        style={styles.toolbarImage}
        resizeMode="contain"
      >
        <View style={styles.iconContainer}>
          <View style={styles.leftIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('FeedScreen')}>
          <Image source={require('../assets/homebutton.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
          <Image source={require('../assets/search.png')} />
          </TouchableOpacity>
          </View>
          <View style={styles.rightIcons}>
            <TouchableOpacity>
            <Image source={require('../assets/reel.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={require('../assets/Human.png')} />
            </TouchableOpacity>
            
          </View>
        </View>
      </ImageBackground>
      <View style={styles.centeredContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
        <Image
          source={require('../assets/searchIcon.png')}
          style={styles.imageStyle}
          resizeMode="contain"
        />
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  toolbarImage: {
    width: '100%',
    height: 66,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: '100%',
  },
  leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  centeredContainer: {
    position: 'absolute', // Absolute positioning to keep it fixed
    bottom: 40,          // Adjust this value to position the icon as needed
    left: '50%',
    transform: [{ translateX: -25 }], // Center the icon based on its width
  },
  imageStyle: {
    width: 50,
    height: 50,
  },
});
