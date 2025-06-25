import { View, Text, ScrollView, Image, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TrafficLaws = () => {
  const [laws, setLaws] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLaws, setFilteredLaws] = useState([]);

  const fetchLaws = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://192.168.8.111:8080/api/v1/laws/recent', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLaws(response.data.laws);
      setFilteredLaws(response.data.laws); // Initialize filtered laws
    } catch (error) {
      console.log("Error fetching laws:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchLaws();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredLaws(laws);
    } else {
      const filtered = laws.filter(law => 
        law.law.toLowerCase().includes(searchQuery.toLowerCase()) || 
        law.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLaws(filtered);
    }
  }, [searchQuery, laws]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ justifyContent: 'center', paddingHorizontal: 10, marginVertical: 24 }}></View>
        <Text style={{ fontSize: 24, paddingHorizontal: 10, color: '#2B286D', fontWeight: '600', marginTop: 10, fontFamily: 'psemibold' }}>
            Traffic Laws
          </Text>
          <TextInput 
            style={styles.searchInput}
            placeholder="Search laws"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        <View/>
      <ScrollView>
        <View style={{ justifyContent: 'center', minHeight: '80%', paddingHorizontal: 16, marginVertical: 24 }}>
          <View>
            <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: '600', marginTop: 20 }}></Text>
            {filteredLaws.map((item, index) => (
              <View key={index} style={{ backgroundColor: '#E0E0E0', padding: 16, marginTop: 16, borderRadius: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.law}</Text>
                <Text style={{ fontSize: 14 }}>{item.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <Image 
            source={images.cards}
            style={{ alignSelf: 'center', width: '68%', height: '15%' }}
            resizeMode="contain"
          />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginTop: 20,
    marginRight:20,
    marginLeft:20,
    backgroundColor: '#2B296D',
    borderRadius : 20,
    height:60,
  },
});

export default TrafficLaws;
