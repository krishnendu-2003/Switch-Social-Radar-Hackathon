import { View, Image, StyleSheet } from 'react-native';
import React from 'react';

export function Profile() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/ToolBar.png')} 
        style={styles.toolbarImage} 
        resizeMode="contain" // Ensure image maintains its aspect ratio
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'white'
  },
  toolbarImage: {
    width: '100%',              
    height: 66,                 
    position: 'absolute',       // Absolute positioning to stick to the bottom
    bottom: 0,                  // Ensures it touches the very bottom edge of the screen
    left: 0,                    // Align it to the left edge
    right: 0,                   // Align it to the right edge
  },
});
