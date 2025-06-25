import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton2 from '../../components/CustomButton2';

const SOS = () => {
  const handleSOS = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Location permission is required to send SOS.');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const message = `SOS! I need help. My current location is: https://maps.google.com/?q=${latitude},${longitude}`;

    try {
      const token = await AsyncStorage.getItem('publicUserToken');
      const userResponse = await axios.get('http://192.168.8.111:8080/api/v1/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const sosNumber = userResponse.data.user.sosNumber;

      const response = await axios.post('http://192.168.8.111:8080/api/v1/twilio/send-sos', {
        to: sosNumber, // Use the user's SOS number
        message,
      });

      if (response.data.success) {
        Alert.alert('Success', 'SOS message sent successfully.');
      } else {
        Alert.alert('Error', 'Failed to send SOS message.');
      }
    } catch (error) {
      console.error('Error sending SOS message:', error);
      Alert.alert('Error', 'Failed to send SOS message.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>SOS</Text>
        <CustomButton2 
          title="Send SOS" 
          handlePress={handleSOS} 
          containerStyles={{ width: '100%', marginTop: 16 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 16,
    marginVertical: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#2B286D',
    fontWeight: '600',
    marginBottom: 20,
  },
});

export default SOS;
