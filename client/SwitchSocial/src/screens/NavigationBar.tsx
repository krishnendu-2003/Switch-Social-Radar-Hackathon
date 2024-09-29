import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';

export function NavigationBar() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/ToolBar.png')}
        style={styles.toolbarImage}
        resizeMode="contain"
      >
        <View style={styles.iconContainer}>
          <View style={styles.leftIcons}>
            <Image source={require('../assets/homebutton.png')} />
            <Image source={require('../assets/search.png')} />
          </View>
          <View style={styles.rightIcons}>
            <Image source={require('../assets/reel.png')} />
            <Image source={require('../assets/Human.png')} />
          </View>
        </View>
      </ImageBackground>
      <View style={styles.centeredContainer}>
        <Image
          source={require('../assets/searchIcon.png')}
          style={styles.imageStyle}
          resizeMode="contain"
        />
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
