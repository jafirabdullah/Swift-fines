import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import CustomButton1 from '../../components/CustomButton1';

const AllFines = () => {
  const [fines, setFines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFines, setFilteredFines] = useState([]);
  const [selectedFine, setSelectedFine] = useState(null);
  const [action, setAction] = useState('Pending'); // Default action

  const fetchAllFines = async () => {
    try {
      const adminToken = await AsyncStorage.getItem('token');
      const { data } = await axios.get('http://192.168.8.111:8080/api/v1/fines', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setFines(data.fines || []);
      setFilteredFines(data.fines || []);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'An error occurred while fetching fines');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFines();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredFines(fines);
    } else {
      const filtered = fines.filter(item =>
        item.referenceNumber && item.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFines(filtered);
      setSelectedFine(filtered.length === 1 ? filtered[0] : null);
    }
  }, [searchQuery, fines]);

  const handleUpdate = async () => {
    if (!selectedFine) return;
    try {
      const adminToken = await AsyncStorage.getItem('token');
      await axios.put(`http://192.168.8.111:8080/api/v1/fines/${selectedFine._id}`, { action }, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      Alert.alert('Success', 'Fine updated successfully!');
      // Reset the page
      setSearchQuery('');
      setSelectedFine(null);
      setAction('Pending');
      fetchAllFines();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'An error occurred while updating the fine');
    }
  };

  const renderFine = ({ item }) => (
    <TouchableOpacity
      style={styles.fineContainer}
      onPress={() => setSelectedFine(item)}
    >
      <Text style={styles.fineTitle}>Reference Number: {item.referenceNumber}</Text>
      <Text>License ID: {item.licenseId}</Text>
      <Text>Fine Details: {item.fineDetails.title}</Text>
      {item.fineDetails.fines.map((fine, index) => (
        <Text key={index}>- {fine}</Text>
      ))}
      <Text>Action: {item.action}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>All Fines</Text>
      <TextInput 
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search by Reference Number"
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList 
          data={filteredFines}
          renderItem={renderFine}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      {selectedFine && (
        <View style={styles.updateContainer}>
          <Text style={styles.updateTitle}>Update Action</Text>
          <Picker
            selectedValue={action}
            style={styles.picker}
            onValueChange={(itemValue) => setAction(itemValue)}
          >
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Resolved" value="Resolved" />
            <Picker.Item label="Rejected" value="Rejected" />
          </Picker>
          <View style={styles.gap} />
          <CustomButton1 
            title="Update"
            handlePress={handleUpdate}
            containerStyles="mt-7"
          />
        </View>
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#2B296D',
    borderRadius : 20,
    height:60,
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
  updateContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#e9e9e9',
    borderRadius: 10,
  },
  updateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  gap: {
    marginVertical: 50,
  },
});

export default AllFines;
