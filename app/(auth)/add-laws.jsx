import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants";
import FormField from '../../components/FormField';
import CustomButton1 from '../../components/CustomButton1';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddLaws = () => {
  const [law, setLaw] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [laws, setLaws] = useState([]);

  const fetchLaws = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://192.168.8.111:8080/api/v1/laws/recent', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLaws(response.data.laws);
    } catch (error) {
      console.log("Error fetching laws:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchLaws();
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("Token from AsyncStorage:", token);
      
      if (!token) {
        Alert.alert("Error", "Please log in first");
        setIsSubmitting(false);
        return;
      }
      
      const response = await axios.post('http://192.168.8.111:8080/api/v1/laws/add', {
        law,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Response from server:", response.data);
      setIsSubmitting(false);
      Alert.alert("Success", "Law added successfully");
      // Clear form fields
      setLaw('');
      setDescription('');
      // Fetch the updated list of laws
      fetchLaws();
    } catch (error) {
      console.log("Error in request:", error.response ? error.response.data : error.message);
      setIsSubmitting(false);
      Alert.alert("Error", "Failed to add law");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
          <Text className="text-xl text-purple text-semibold mt-10 font-psemibold">
            Traffic Laws
          </Text>
          <FormField 
            title="Add New Law"
            value={law}
            handleChangeText={setLaw}
            otherStyles="mt-5"
            placeHolder="Enter new law"
          />
          <FormField 
            title="Description"
            value={description}
            handleChangeText={setDescription}
            otherStyles="mt-5"
            placeHolder="Enter description"
          />
          <CustomButton1 
            title="Add New Law" 
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <Image 
            source={images.cards}
            style={{ alignSelf: 'center', width: '68%', height: '15%' }}
            resizeMode="contain"
          />
          <View>
            <Text className="text-lg text-center font-psemibold">Recent Laws</Text>
            {laws.map((item, index) => (
              <View key={index} className="bg-gray-200 p-4 mt-4 rounded-lg">
                <Text className="text-base font-bold">{item.law}</Text>
                <Text className="text-sm">{item.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddLaws;
