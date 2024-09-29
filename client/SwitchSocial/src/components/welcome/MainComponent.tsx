import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StatusBar from './StatusBar';
import Button from './Button';

const MainComponent: React.FC = () => {
  const handleGetStarted = () => {
    // Handle button press
  };

  return (
    <View style={styles.container}>
      <StatusBar
        imageUri="https://cdn.builder.io/api/v1/image/assets/TEMP/a8eb7771609169fa489c6fcd167ec8030262ed057d0a6eeeb4490ef768545e0a?placeholderIfAbsent=true&apiKey=d0af66e7a39b4cea9c6816595ece13dc"
      />
      <View style={styles.emptySection} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur elit.
          {'\n'}
          Nulla enim laborum, nam quasi error eius
          {'\n'}
          nihil! Iusto tenetur, nihil dicta sequi
        </Text>
      </View>
      <Button text="Get Started" onPress={handleGetStarted} />
      <View style={styles.bottomBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 'auto',
    width: '100%',
    backgroundColor: 'black',
    maxWidth: 480,
    borderRadius: 36,
    overflow: 'hidden',
  },
  emptySection: {
    alignSelf: 'stretch',
    marginTop: 64,
    width: '100%',
    minHeight: 551,
  },
  textContainer: {
    marginTop: 6,
  },
  text: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  bottomBar: {
    marginTop: 24,
    backgroundColor: 'white',
    height: 5,
    borderRadius: 50,
    width: 134,
  },
});

export default MainComponent;
