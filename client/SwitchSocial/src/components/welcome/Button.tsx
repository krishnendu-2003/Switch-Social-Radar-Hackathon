import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type ButtonProps = {
  text: string;
  onPress: () => void;
};

const Button: React.FC<ButtonProps> = ({ text, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.buttonContainer}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 28,
    width: 188,
    backgroundColor: '#000',
    borderRadius: 50,
    shadowColor: '#fff',
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  textWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 2,
    backgroundColor: '#000',
    borderRadius: 30,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Button;