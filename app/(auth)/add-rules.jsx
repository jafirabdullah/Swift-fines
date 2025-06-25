import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants";
import FormField from '../../components/FormField';
import CustomButton1 from '../../components/CustomButton1';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTrafficRules = () => {
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
      
      const response = await axios.post('http://192.168.8.111:8080/api/v1/traffic-rules/add', {
        rule,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Response from server:", response.data);
      setIsSubmitting(false);
      Alert.alert("Success", "Traffic rule added successfully");
      // Clear form fields
      setRule('');
      setDescription('');
      // Fetch the updated list of traffic rules
      fetchRules();
    } catch (error) {
      console.log("Error in request:", error.response ? error.response.data : error.message);
      setIsSubmitting(false);
      Alert.alert("Error", "Failed to add traffic rule");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View style={{ justifyContent: 'center', minHeight: '80%', paddingHorizontal: 16, marginVertical: 24 }}>
          <Text style={{ fontSize: 24, color: '#2B286D', fontWeight: '600', marginTop: 40, fontFamily: 'psemibold' }}>
            Traffic Rules
          </Text>
          <FormField 
            title="Add New Rule"
            value={rule}
            handleChangeText={setRule}
            otherStyles="mt-5"
            placeHolder="Enter new rule"
          />
          <FormField 
            title="Description"
            value={description}
            handleChangeText={setDescription}
            otherStyles="mt-5"
            placeHolder="Enter description"
          />
          <CustomButton1 
            title="Add New Rule" 
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
            <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: '600', marginTop: 20 }}>Recent Rules</Text>
            {rules.map((item, index) => (
              <View key={index} style={{ backgroundColor: '#E0E0E0', padding: 16, marginTop: 16, borderRadius: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.rule}</Text>
                <Text style={{ fontSize: 14 }}>{item.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddTrafficRules;
