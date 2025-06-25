import { View, Text, ScrollView, Image, TextInput, Alert, StyleSheet, ActivityIndicator, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton1 from '../../components/CustomButton1';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const [userData, setUserData] = useState({
    licenseId: '',
    email: '',
    address: '',
    bloodGroup: '',
    mobileNumber: '',
    sex: '',
    dateOfBirth: '',
    profileImage: '',
    sosNumber: '', // Add this field
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('publicUserToken');
        if (!token) {
          Alert.alert('Error', 'No token found, please log in again.');
          return;
        }
        const response = await axios.get('http://192.168.8.111:8080/api/v1/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data.user);
      } catch (error) {
        Alert.alert('Error', error.response?.data?.message || "An error occurred while fetching user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    setIsSubmitting(true);
    try {
      const token = await AsyncStorage.getItem('publicUserToken');
      if (!token) {
        Alert.alert('Error', 'No token found, please log in again.');
        setIsSubmitting(false);
        return;
      }
      await axios.put('http://192.168.8.111:8080/api/v1/auth/profile', userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      await axios.put('http://192.168.8.111:8080/api/v1/auth/update-sos', { sosNumber: userData.sosNumber }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      Alert.alert('Success', 'Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || "An error occurred while updating profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setUserData({ ...userData, profileImage: selectedImage });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2B286D" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>My Profile</Text>
        <Image 
          source={userData.profileImage ? { uri: userData.profileImage } : images.profile}
          style={styles.profileImage}
          resizeMode="contain"
        />
        <Button title="Change Profile Image" onPress={handleImagePicker} />
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>License ID</Text>
          <TextInput 
            style={styles.input}
            value={userData.licenseId}
            editable={false}
            placeholder="License ID"
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input}
            value={userData.email}
            editable={isEditing}
            onChangeText={(text) => setUserData({ ...userData, email: text })}
            placeholder="Email"
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput 
            style={styles.input}
            value={userData.address}
            editable={isEditing}
            onChangeText={(text) => setUserData({ ...userData, address: text })}
            placeholder="Address"
          />
        </View>
        {isEditing && (
          <>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Blood Group</Text>
              <TextInput 
                style={styles.input}
                value={userData.bloodGroup}
                onChangeText={(text) => setUserData({ ...userData, bloodGroup: text })}
                placeholder="Blood Group"
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Mobile Number</Text>
              <TextInput 
                style={styles.input}
                value={userData.mobileNumber}
                onChangeText={(text) => setUserData({ ...userData, mobileNumber: text })}
                placeholder="Mobile Number"
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Sex</Text>
              <TextInput 
                style={styles.input}
                value={userData.sex}
                onChangeText={(text) => setUserData({ ...userData, sex: text })}
                placeholder="Sex"
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput 
                style={styles.input}
                value={userData.dateOfBirth}
                onChangeText={(text) => setUserData({ ...userData, dateOfBirth: text })}
                placeholder="Date of Birth"
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>SOS Number</Text>
              <TextInput 
                style={styles.input}
                value={userData.sosNumber}
                onChangeText={(text) => setUserData({ ...userData, sosNumber: text })}
                placeholder="SOS Number"
              />
            </View>
          </>
        )}
      </ScrollView>
      <CustomButton1 
        title={isEditing ? "Save Changes" : "Edit Profile"} 
        handlePress={isEditing ? handleSaveChanges : () => setIsEditing(true)}
        isLoading={isSubmitting}
      />
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  fieldContainer: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#2B286D',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#2B296D',
    borderRadius : 20,
    height:60,
    color :'white'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default Profile;
