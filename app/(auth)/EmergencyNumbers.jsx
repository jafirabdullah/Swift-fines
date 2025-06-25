import { View, Text, ScrollView, TextInput, StyleSheet, SafeAreaView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { images } from "../../constants";

const EmergencyNumbers = () => {
  const emergencyNumbers = [
    { title: "Police Emergency Hotline", number: "118/119" },
    { title: "Ambulance / Fire & Rescue", number: "110" },
    { title: "Accident Service-General Hospital-Colombo", number: "011-2691111" },
    { title: "Police Emergency", number: "011-2433333" },
    { title: "Government Information Center", number: "1919" },
    { title: "Report Crimes", number: "011-2691500" },
    { title: "Emergency Police Mobile Squad", number: "011-5717171" },
    { title: "Fire & Ambulance Service-General", number: "011-2422222" },
    { title: "Police Headquarters", number: "011-2421111" },
    { title: "Bomb Disposal", number: "011-2433335" },
    { title: "Bomb Disposal Unit Army Head Quarters", number: "011-2434251/011-4055105/011-4055106/076-6911604" },
    { title: "Electricity Break Down", number: "011-2466660/011-4617575" },
    { title: "Marshal office – General Contact", number: "0112583107 | 0112559906" },
    { title: "Deputy Chief Marshal", number: "071-5371522" },
    { title: "Department of Motor Traffic", number: "+94 112 033333" },
    { title: "Ministry of Transport and Highways", number: "+94 112 698 322, +94 112 694 005, +94 112 693 786" },
    { title: "Expressway Bus Inquiries", number: "1955 or 0112587372" },
    { title: "Plod Security Office", number: "011-2667565/011-2677410" },
    { title: "Plod Security Office Fax", number: "011-2667565" },
    { title: "Director Plod Security", number: "071-3920919" },
    { title: "Area Manager Plod Security – Mr.Sanjeewa", number: "071-3991444" },
    { title: "OIC Mr TM Sumanaweera – College House", number: "071-3991430" },
    { title: "OIC Mr DK Sameera – Faculty of Science", number: "078-6794260" },
    { title: "OIC Mr N Kulathunga – Faculty of Management", number: "078-7560850" },
    { title: "OIC Mr KM Shantha Kumara -Faculty of Art, Education and FGS", number: "071-5834654" },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNumbers, setFilteredNumbers] = useState(emergencyNumbers);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredNumbers(emergencyNumbers);
    } else {
      const filtered = emergencyNumbers.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.number.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNumbers(filtered);
    }
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Emergency Numbers</Text>
      <TextInput 
        style={styles.searchInput}
        placeholder="Search emergency numbers"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView>
        <View style={styles.numbersContainer}>
          {filteredNumbers.map((item, index) => (
            <View key={index} style={styles.numberItem}>
              <Text style={styles.numberTitle}>{item.title}</Text>
              <Text style={styles.number}>{item.number}</Text>
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
    height: 60,
  },
  numbersContainer: {
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  numberItem: {
    backgroundColor: '#E0E0E0',
    padding: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  numberTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  number: {
    fontSize: 14,
  },
});

export default EmergencyNumbers;
