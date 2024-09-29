import { View, Image, StyleSheet } from 'react-native';
import React from 'react';

export function Profile() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/ToolBar.png')} 
        style={styles.toolbarImage} 
        resizeMode="contain"
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
