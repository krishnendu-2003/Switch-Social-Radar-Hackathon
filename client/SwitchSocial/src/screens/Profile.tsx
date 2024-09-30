import { View, Text, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import React from 'react';
import { NavigationBar } from '../screens/NavigationBar';
import { ConnectButton } from '../components/sign-in/sign-in-ui';

export function Profile() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/MyProfile.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Image source={require('../assets/bell.fill.png')}  style={{ alignSelf: 'flex-end', margin: 20}}/>
          <Text style={styles.profileTitle}>My Profile</Text>
          <Image source={require('../assets/ProfilePhoto.jpeg')} style={styles.profilePhoto} />
          <Text style={styles.username}>Echo_Whisper._</Text>

          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.connect}>
            <Text style={styles.connectText}>120</Text>
            <Text style={styles.connectTextDD}>Asset</Text>
            </View>
            <View style={styles.connect}>
              <Text style={styles.connectText}>10K</Text>
              <Text style={styles.connectTextDD}>Followers</Text>
            </View>
            <View style={styles.connect}>
              <Text style={styles.connectText}>70K</Text>
              <Text style={styles.connectTextDD}>Likes</Text>
            </View>
            <View style={styles.connect}>
              <Text style={styles.connectText}>60</Text>
              <Text style={styles.connectTextDD}>Bidding</Text>
            </View>
          </View>
          <View>
            <Text style={{color:'white'}}>
              Your Balance
            </Text>
            <View  style={styles.connectText }>
              <View><Image source={require('../assets/Ethicon.png')}/></View>
              <View><Text style={{color:'white'}}>4,668 ETH</Text></View>
              <View><Text style={{color:'white'}}>Add  > </Text></View>
            </View>
          </View>

        </ScrollView>
        <NavigationBar />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  profileTitle: {
    color: 'white',
    fontSize: 50,

  },
  profilePhoto: {
    width: 150, 
    height: 150, 
    borderRadius: 75, 
    borderWidth: 2,
    margin: 20
  },
  username: {
    color: 'white',
    fontSize: 20,
    marginBottom: 30

  },
  connect: {
    alignItems: 'center',
    // justifyContent: 'center',
    margin: 10,
  },
  connectText: {
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#060925',
    padding: 10,
    borderRadius: 8,             
    fontSize: 18, 
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 86, 
  },
  connectTextDD: {
      
    padding: 10,
    borderRadius: 8,              
    fontSize: 15, 
    color: 'white'
  }
});
