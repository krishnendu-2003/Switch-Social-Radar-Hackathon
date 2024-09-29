import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

type StatusBarProps = {
  imageUri: string;
};

const StatusBar: React.FC<StatusBarProps> = ({ imageUri }) => (
  <View style={styles.container}>
    <Image
      source={{ uri: imageUri }}
      style={styles.image}
      resizeMode="contain"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    width: '100%',
    maxWidth: 332,
  },
  image: {
    width: 71,
    aspectRatio: 5.92,
    borderRadius: 0,
  },
});

export default StatusBar;
