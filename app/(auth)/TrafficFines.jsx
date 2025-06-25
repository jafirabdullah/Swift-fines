import { View, Text, ScrollView, TextInput, StyleSheet, SafeAreaView,Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { images } from '../../constants';

const TrafficFines = () => {
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
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFines, setFilteredFines] = useState(trafficFines);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredFines(trafficFines);
    } else {
      const filtered = trafficFines.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fines.some(fine => fine.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredFines(filtered);
    }
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Traffic Fines</Text>
      <TextInput 
        style={styles.searchInput}
        placeholder="Search traffic fines"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView>
        <View style={styles.finesContainer}>
          {filteredFines.map((item, index) => (
            <View key={index} style={styles.fineItem}>
              <Text style={styles.fineTitle}>{item.title}</Text>
              {item.fines.map((fine, idx) => (
                <Text key={idx} style={styles.fine}>{fine}</Text>
              ))}
            </View>
          ))}
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    paddingHorizontal: 20,
    color: '#2B286D',
    fontWeight: '600',
    marginTop: 40,
    fontFamily: 'psemibold',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#2B296D',
    borderRadius : 20,
    height:60,
  },
  finesContainer: {
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  fineItem: {
    backgroundColor: '#E0E0E0',
    padding: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  fineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fine: {
    fontSize: 14,
  },
});

export default TrafficFines;
