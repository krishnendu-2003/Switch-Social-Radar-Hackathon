import { View, Text, ImageBackground, ScrollView,StyleSheet } from 'react-native';
import React from 'react';
import { NavigationBar } from '../screens/NavigationBar';


export function FeedScreen(){

  return (
    <View style={styles.container}>
        
            <ScrollView>
<Text>sfsaf</Text>
            </ScrollView>
            <NavigationBar />

    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

  });
  