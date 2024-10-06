import { View, Text, StyleSheet, ImageBackground, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { NavigationBar } from '../screens/NavigationBar';
import { ConnectButton } from '../components/sign-in/sign-in-ui';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LogoutButton from '../components/LogoutButton';


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
          <View style={{ flexDirection: 'row', alignItems: 'center',
             backgroundColor: 'rgba(128, 128, 128, 0.5)',
             borderRadius: 10,}}>
          <TouchableOpacity >
          <Image source={require('../assets/ProfilePhoto.jpeg')} style={styles.profilePhoto} />
          {/* <TouchableOpacity 
          style={{backgroundColor: 'colors.secondary',
            borderRadius:24, padding:8, 
            position: 'absolute',
             borderWidth:2
            }}
          >
        <MaterialCommunityIcons name="camera-outline" size={24} color="black" />   
        </TouchableOpacity> */}
       
          </TouchableOpacity>
          <View style={{ marginLeft: 1 }}>
          <Text style={styles.profileTitle}>Creator Dashboard</Text>

          <Text style={styles.username}>Manage your content and earnings</Text>
          </View>
          </View>

          <View style={{  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop:31}}>
            <View>
              <Text style={{color:'white', fontSize: 25
              }}>
                My Products
              </Text>
              <Text style={{color:'white'}}>
                Track sales and rewards
              </Text>
            </View>
            <View>
              <TouchableOpacity>
                <View >
                <Text style={{color:'white', marginLeft:91,backgroundColor: 'rgba(128, 128, 128, 0.5)', padding:10,  borderRadius: 8}}>View Details</Text>
                </View>
                
              </TouchableOpacity>
           
            
            </View>
          </View>

          
            <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop: 50, }}>
            <TouchableOpacity>
          <View style={{backgroundColor: 'rgba(128, 128, 128, 0.5)',borderRadius: 8,flex: 1, marginRight: 10}}>
                  <Image 
                  source={require('../assets/product2.jpg')}
                  style={styles.productImage}/>
                   <View style={styles.productInfo}>
      <Text style={styles.productName}>Product Name</Text> 
      <Text style={styles.productPrice}>$99.99</Text>  
    </View>
                </View> 
          </TouchableOpacity>
          <TouchableOpacity>
          <View style={{backgroundColor: 'rgba(128, 128, 128, 0.5)',borderRadius: 8,flex: 1 }}>
                  <Image 
                  source={require('../assets/product2.jpg')}
                  style={styles.productImage}/>
                   <View style={styles.productInfo}>
      <Text style={styles.productName}>Product Name</Text> 
      <Text style={styles.productPrice}>$99.99</Text>  
    </View>
                </View>
          </TouchableOpacity>

                
            </View>
                 
      
          
{/* 
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
          </View> */}
          {/* <View>
            <Text style={{color:'white'}}>
              Your Balance
            </Text>
            <View  style={styles.connectText }>
              <View><Image source={require('../assets/Ethicon.png')}/></View>
              <View><Text style={{color:'white'}}>4,668 ETH</Text></View>
              <View><Text style={{color:'white'}}>Add </Text></View>
            </View>
          </View> */}

          <View style={styles.logoutButton}>
          <LogoutButton/>

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
    fontSize: 20,

  },
  profilePhoto: {
    width: 50, 
    height: 50, 
    borderRadius: 75, 
    borderWidth: 2,
    margin: 20,
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
    borderColor: 'white',
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
  },
  productImage: {
    width: 150,  // Adjust the width
    height: 150,  // Adjust the height
    borderRadius: 8,  // Optional: Make the image corners rounded
    marginBottom: 10  // Space between image and text
  },
  productInfo: {
    alignItems: 'center',  // Center-align the text below the image
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white' 
  },
  productPrice: {
    fontSize: 14,
    color: 'white',
    marginTop: 4,  // Space between the name and price
  },
  logoutButton: {
    alignSelf: 'flex-end', // This will move the button to the right
    marginRight: 20, 
    marginTop: 80,

  }
});
