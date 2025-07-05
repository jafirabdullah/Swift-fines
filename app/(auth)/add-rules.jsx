import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { images } from "../../constants";
import FormField from '../../components/FormField';
import CustomButton1 from '../../components/CustomButton1';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTrafficRules = () => {
  const [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  const [rule, setRule] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rules, setRules] = useState([]);

  const fetchRules = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://192.168.8.111:8080/api/v1/traffic-rules/recent', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRules(response.data.trafficRules);
    } catch (error) {
      console.log("Error fetching traffic rules:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  if (!fontsLoaded) return null;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert("Error", "Please log in first");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post('http://192.168.8.111:8080/api/v1/traffic-rules/add', {
        rule,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      Alert.alert("Success", "Traffic rule added successfully");
      setRule('');
      setDescription('');
      fetchRules();
    } catch (error) {
      console.log("Error in request:", error.response ? error.response.data : error.message);
      Alert.alert("Error", "Failed to add traffic rule");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 50 }}>
        <View style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 40 }}>

          <Text style={{
            fontSize: 24,
            color: '#2B286D',
            fontWeight: '600',
            fontFamily: 'Poppins-SemiBold',
            marginBottom: 20,
          }}>
            Traffic Rules
          </Text>

          <FormField 
            title="Add New Rule"
            value={rule}
            handleChangeText={setRule}
            otherStyles="mb-4"
            placeHolder="Enter new rule"
          />

          <FormField 
            title="Description"
            value={description}
            handleChangeText={setDescription}
            otherStyles="mb-4"
            placeHolder="Enter description"
          />

          <CustomButton1 
            title="Add New Rule" 
            handlePress={handleSubmit}
            containerStyles={{ marginTop: 16 }}
            isLoading={isSubmitting}
          />

          <Image 
            source={images.cards}
            style={{
              alignSelf: 'center',
              width: '70%',
              height: 100,
              resizeMode: 'contain',
              marginTop: 20,
            }}
          />

          <Text style={{
            fontSize: 18,
            textAlign: 'center',
            fontWeight: '600',
            marginTop: 20,
            fontFamily: 'Poppins-SemiBold',
          }}>
            Recent Rules
          </Text>

          {Array.isArray(rules) && rules.map((item, index) => (
            <View key={index} style={{ backgroundColor: '#E0E0E0', padding: 16, marginTop: 16, borderRadius: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Poppins-SemiBold' }}>{item.rule}</Text>
              <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}>{item.description}</Text>
            </View>
          ))}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddTrafficRules;
