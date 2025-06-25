import { View, ScrollView, Image, TouchableOpacity, Alert, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton2 from '../../components/CustomButton2';
import { useRouter } from 'expo-router';
import { images } from '../../constants'; // Adjust this import based on your initial usage
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const AdminHome = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('adminToken');
      router.replace('/admin-login'); // Clear the stack and navigate to login
    } catch (error) {
      Alert.alert('Error', 'An error occurred while logging out');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 16 }}>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="sign-out" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
        <View style={{ marginTop: 0, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <CustomButton2
            title="PUT FINES"
            handlePress={() => router.push('/Search')}
            containerStyles={{ flex: 1, marginRight: 4 }}
          />
          <CustomButton2
            title="ADD TRAFFIC LAWS"
            handlePress={() => router.push('/add-laws')}
            containerStyles={{ flex: 1, marginLeft: 4 }}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <CustomButton2
            title="FINE HISTORY"
            handlePress={() => router.push('/FineHistory')}
            containerStyles={{ flex: 1, marginRight: 4 }}
          />
          <CustomButton2
            title="ADD TRAFFIC RULES"
            handlePress={() => router.push('/add-rules')}
            containerStyles={{ flex: 1, marginLeft: 4 }}
          />
        </View>
        <CustomButton2
          title="SEARCH"
          handlePress={() => router.push('/Search')}
          containerStyles={{ width: '100%', marginTop: 16, marginBottom: 56 }} // Added marginBottom to create a gap
        />
          <CustomButton2
          title="ALL FINES"
          handlePress={() => router.push('/AllFines')}
          containerStyles={{ width: '100%', marginTop: -110, marginBottom: 56, marginLeft:190}} // Added marginBottom to create a gap
        />
        {images.cards && (
          <Image 
            source={images.cards}
            style={{ alignSelf: 'center', width: '68%', height: '11%' }}
            resizeMode="contain"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default AdminHome;
