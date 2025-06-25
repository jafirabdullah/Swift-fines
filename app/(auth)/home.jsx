import { View, ScrollView, Image, TouchableOpacity, Alert, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton2 from '../../components/CustomButton2';
import { useRouter } from 'expo-router';
import { images } from '../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const PublicHome = () => {
  const router = useRouter();
  const [hasNewFine, setHasNewFine] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('publicUserToken');
        if (!token) {
          router.replace('/public-login'); // Redirect to login if no token
          return;
        }
        const response = await axios.get('http://192.168.8.111:8080/api/v1/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setHasNewFine(response.data.user.hasNewFine);
      } catch (error) {
        Alert.alert('Error', error.response?.data?.message || 'An error occurred while fetching user data');
      }
    };

    fetchUserData();
  }, []);

  const handleNotificationClick = async () => {
    try {
      const token = await AsyncStorage.getItem('publicUserToken');
      const userResponse = await axios.get('http://192.168.8.111:8080/api/v1/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userId = userResponse.data.user._id;

      await axios.put(`http://192.168.8.111:8080/api/v1/fines/clear-notifications/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setHasNewFine(false);
      router.push('/Notifications');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'An error occurred while clearing notifications');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('publicUserToken');
    router.replace('/public-login'); // Clear the stack and navigate to login
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
        <TouchableOpacity onPress={handleNotificationClick}>
          <Icon 
            name="bell" 
            size={30} 
            color={hasNewFine ? 'red' : 'black'} 
          />
          {hasNewFine && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="sign-out" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
        {images.carousel && (
          <Image 
            source={images.carousel}
            style={{ alignSelf: 'center', width: '100%', height: '45%' }} // Adjust height as needed
            resizeMode="contain"
          />
        )}
        <View style={{ marginTop: 0, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <CustomButton2
            title="MY FINES"
            handlePress={() => router.push('/MyFines')}
            containerStyles={{ flex: 1, marginRight: 4 }}
          />
          <CustomButton2
            title="TRAFFIC LAWS"
            handlePress={() => router.push('/traffic-laws')}
            containerStyles={{ flex: 1, marginLeft: 4 }}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <CustomButton2
            title="EMERGENCY"
            handlePress={() => router.push('/EmergencyNumbers')}
            containerStyles={{ flex: 1, marginRight: 4 }}
          />
          <CustomButton2
            title="TRAFFIC FINES"
            handlePress={() => router.push('/TrafficFines')}
            containerStyles={{ flex: 1, marginLeft: 4 }}
          />
        </View>
        <CustomButton2
          title="MY PROFILE"
          handlePress={() => router.push('/Profile')}
          containerStyles={{ width: '100%', marginTop: 16, marginBottom: 16 }} // Added marginBottom to create a gap
        />
        {images.cards && (
          <Image 
            source={images.cards}
            style={{ alignSelf: 'center', width: '68%', height: '11%' }}
            resizeMode="contain"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default PublicHome;
