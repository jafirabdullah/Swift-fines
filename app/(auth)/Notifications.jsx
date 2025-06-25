import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notifications = () => {
  const [fines, setFines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = await AsyncStorage.getItem('publicUserToken');
        const userResponse = await axios.get('http://192.168.8.111:8080/api/v1/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const licenseId = userResponse.data.user.licenseId;

        const { data } = await axios.get(`http://192.168.8.111:8080/api/v1/fines/user/${licenseId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFines(data.fines);
        setIsLoading(false);
      } catch (error) {
        Alert.alert('Error', error.response?.data?.message || 'An error occurred while fetching notifications');
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const renderFine = ({ item }) => (
    <View style={styles.fineContainer}>
      <Text style={styles.fineTitle}>Reference Number: {item.referenceNumber}</Text>
      <Text>License ID: {item.licenseId}</Text>
      <Text>Fine Details: {item.fineDetails.title}</Text>
      {item.fineDetails.fines.map((fine, index) => (
        <Text key={index}>- {fine}</Text>
      ))}
    </View>
  );

  const clearNotifications = async () => {
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

      setFines([]);
      Alert.alert('Success', 'Notifications cleared');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'An error occurred while clearing notifications');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <FlatList 
            data={fines}
            renderItem={renderFine}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity onPress={clearNotifications} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear Notifications</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  fineContainer: {
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  fineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff0000',
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Notifications;
