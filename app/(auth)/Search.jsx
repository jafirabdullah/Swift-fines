import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import CustomButton1 from '../../components/CustomButton1';

const trafficFines = [
  { title: "Driving without a license", fines: ["First occasion - Rs 25,000", "Second occasion Rs 30,000"] },
  { title: "Employing a driver without a licence", fines: ["First occasion - Rs 25,000 - Rs 30,000", "Second occasion - Rs 30,000 - Rs 50,000"] },
  { title: "Driving under the influence of liquor / narcotics", fines: ["Rs 25,000 - Rs 30,000 or an imprisonment term not more than three months", "Suspension of the driving license for not more than an year"] },
  { title: "Transporting passengers for hire while being under the influence of liquor", fines: ["Rs 25,000 - Rs 30,000", "Imprisonment up to six months", "Cancellation of the driving license"] },
  { title: "Causing injuries / death to a person while driving under the influence of liquor", fines: ["In case of death: A fine of Rs 100,000 - Rs 150,000 and / or imprisonment between 2-10 years and cancellation of the driving license", "In case of causing serious injuries to a person: A fine of Rs 50,000 - Rs 100,000 and / or imprisonment of not more than five years and cancellation of the driving license", "In case of causing minor injuries to a person: A fine of Rs 30,000 - Rs 50,000 and / or imprisonment of not more than one year and cancellation of the driving license"] },
  { title: "Driving through railway crossings in a haphazard manner", fines: ["First occasion - Rs 25,000 - Rs 30,000", "Second occasion - Rs 25,000 - Rs 40,000", "Third occasion - Rs 40,000 - Rs 50,000", "Suspension of the driving license up to 12 months"] },
  { title: "Driving without a valid insurance cover", fines: ["Rs 25,000 - Rs 50,000 and / or imprisonment of not more than one month"] },
  { title: "Speeding", fines: ["Rs 1000 - Rs 2000", "Rs 2000 - Rs 3000", "Rs 3500 - Rs 5000"] },
  { title: "Driving 20 percent more than the maximum speed limit", fines: ["Rs 3000 - Rs 5000", "Spot fine of Rs 3000"] },
  { title: "Driving between 20 percent to 30 percent more the maximum speed limit", fines: ["Rs 5000 - Rs 10,000", "Spot fine of Rs 5000"] },
  { title: "Driving between 30 percent to 50 percent more the maximum speed limit", fines: ["Rs 10,000 - Rs 15,000", "Spot fine of Rs 10,000"] },
  { title: "Driving more than 50 percent of the maximum speed limit", fines: ["Rs 15,000 - Rs 25,000", "Spot fine of Rs 15,000"] },
  { title: "Overtaking from the left side / breaching road rules", fines: ["Rs 2500 - Rs 3500", "Rs 3500 - Rs 5000", "Rs 5000 - Rs 25,000", "Spot fine of Rs 2000"] },
  // Add more fines as needed
];

const Search = () => {
  const [licenseId, setLicenseId] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFine, setSelectedFine] = useState(null);
  const [selectedOccasion, setSelectedOccasion] = useState(null); // To select a specific occasion
  const [showOptions, setShowOptions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [action, setAction] = useState('Pending'); // Default action

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`http://192.168.8.111:8080/api/v1/public/users/${licenseId}`);
      setUserData(data.user);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || "An error occurred while fetching user data");
      setIsLoading(false);
    }
  };

  const handleFineSelect = (fine) => {
    setSelectedFine(fine);
    setSelectedOccasion(null); // Reset selected occasion
    setShowOptions(false);
  };

  const handlePutFine = async () => {
    if (!selectedFine || !selectedOccasion) {
      Alert.alert('Error', 'Please select a fine and an occasion before submitting.');
      return;
    }

    try {
      setIsSubmitting(true);
      const adminToken = await AsyncStorage.getItem('token');
      const { data } = await axios.post('http://192.168.8.111:8080/api/v1/fines/add', {
        licenseId: userData.licenseId,
        fineDetails: {
          title: selectedFine.title,
          occasion: selectedOccasion,
        },
        action,
      }, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        }
      });
      Alert.alert('Success', `Fine put successfully! Reference Number: ${data.fine.referenceNumber}`);
      Alert.alert('Notification', 'The user has been notified about the fine');
      // Reset the search page
      setLicenseId('');
      setUserData(null);
      setSelectedFine(null);
      setSelectedOccasion(null);
      setAction('Pending');
      setIsSubmitting(false);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || "An error occurred while putting the fine");
      console.error("Error details:", error.response?.data || error.message || error);
      setIsSubmitting(false);
    }
  };

  const renderFine = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleFineSelect(item)}
      style={[styles.fineContainer, selectedFine?.title === item.title && styles.selectedFineContainer]}
    >
      <Text style={[styles.fineTitle, selectedFine?.title === item.title && styles.selectedFineTitle]}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Search Public User</Text>
        <TextInput 
          style={styles.input}
          value={licenseId}
          onChangeText={setLicenseId}
          placeholder="Enter License ID"
        />
        <Button title="Search" onPress={handleSearch} />
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        {userData && (
          <View>
            <View style={styles.userDataContainer}>
              <Text style={styles.userDataText}>License ID: {userData.licenseId}</Text>
              <Text style={styles.userDataText}>Email: {userData.email}</Text>
              <Text style={styles.userDataText}>Address: {userData.address}</Text>
              <Text style={styles.userDataText}>Mobile Number: {userData.mobileNumber}</Text>
              <Text style={styles.userDataText}>Sex: {userData.sex}</Text>
              <Text style={styles.userDataText}>Date of Birth: {userData.dateOfBirth}</Text>
              <Text style={styles.userDataText}>Blood Group: {userData.bloodGroup}</Text>
            </View>
            <View style={styles.selectBox}>
              <TouchableOpacity style={styles.selectBoxCurrent} onPress={() => setShowOptions(!showOptions)}>
                <Text style={styles.selectBoxValue}>{selectedFine ? selectedFine.title : "Select a fine"}</Text>
                <Image source={{uri: "http://cdn.onlinewebfonts.com/svg/img_295694.svg"}} style={styles.selectBoxIcon} />
              </TouchableOpacity>
              {showOptions && (
                <FlatList 
                  data={trafficFines}
                  renderItem={renderFine}
                  keyExtractor={(item, index) => index.toString()}
                  style={styles.fineList}
                />
              )}
            </View>
          </View>
        )}
        {selectedFine && (
          <View>
            <View style={styles.selectedFineDetailsContainer}>
              <Text style={styles.selectedFineTitle}>Selected Fine</Text>
              <Text style={styles.fineTitle}>{selectedFine.title}</Text>
              <Picker
                selectedValue={selectedOccasion}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedOccasion(itemValue)}
              >
                <Picker.Item label="Select an occasion" value={null} />
                {selectedFine.fines.map((fine, index) => (
                  <Picker.Item key={index} label={fine} value={fine} />
                ))}
              </Picker>
              {selectedOccasion && (
                <Text style={styles.selectedOccasionText}>Selected Amount: {selectedOccasion.split(' - ')[1]}</Text>
              )}
            </View>

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
              title="Put Fine" 
              handlePress={handlePutFine}
              containerStyles="mt-7"  
              isLoading={isSubmitting}
            />
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
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
    color : '#2B296D'
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    backgroundColor: '#2B296D',
    borderRadius : 20,
  },
  userDataContainer: {
    marginTop: 16,
  },
  userDataText: {
    fontSize: 16,
    marginBottom: 8,
  },
  selectBox: {
    position: 'relative',
    display: 'block',
    width: '100%',
    margin: '0 auto',
    fontFamily: 'Open Sans, Helvetica Neue, Segoe UI, Calibri, Arial, sans-serif',
    fontSize: 18,
    color: '#60666d',
    boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    outline: 'none',
  },
  selectBoxCurrent: {
    position: 'relative',
    cursor: 'pointer',
    outline: 'none',
  },
  selectBoxValue: {
    display: 'block',
    width: '100%',
    margin: 0,
    padding: 15,
    backgroundColor: '#fff',
  },
  selectBoxIcon: {
    position: 'absolute',
    top: '50%',
    right: 15,
    transform: [{ translateY: -50 }],
    width: 20,
    opacity: 0.3,
    transition: '0.2s ease',
  },
  fineList: {
    position: 'absolute',
    width: '100%',
    padding: 0,
    listStyle: 'none',
    opacity: 1,
    maxHeight: 200, // Limit the height of the list
    overflowY: 'scroll', // Allow scrolling if list is too long
    backgroundColor: '#fff',
    boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.1)',
    zIndex: 1,
  },
  fineContainer: {
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  selectedFineContainer: {
    backgroundColor: '#d9f9d9',
  },
  fineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedFineTitle: {
    color: '#007700',
  },
  selectedFineDetailsContainer: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#e9e9e9',
    borderRadius: 10,
  },
  selectedFineTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedOccasionText: {
    fontSize: 18,
    color: 'green',
    marginTop: 10,
  },
  gap: {
    marginVertical: 100,
  },
  picker: {
    height: 150,
    width: '100%',
    marginBottom: 1,
    marginTop: 50,
  },
});

export default Search;
