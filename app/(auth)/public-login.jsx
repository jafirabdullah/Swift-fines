import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants";
import FormField from '../../components/FormField';
import CustomButton3 from '../../components/CustomButton3';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PublicLogin = () => {
  const [licenseId, setLicenseId] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      if (!licenseId || !password) {
        Alert.alert('Please Fill All Fields');
        setIsSubmitting(false);
        return;
      }

      await AsyncStorage.removeItem('publicUserToken');

      const { data } = await axios.post(
        "http://192.168.8.111:8080/api/v1/auth/login",
        { licenseId, password }
      );

      await AsyncStorage.setItem('publicUserToken', data.token);

      Alert.alert(data.message);
      console.log("Login Data==>", { licenseId, password });
      setIsSubmitting(false);

      router.push('/home');
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      Alert.alert(errorMessage);
      setIsSubmitting(false);
      console.error("Login Error: ", errorMessage, error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 40 }}>
        <View style={{ justifyContent: 'center', width: '100%' }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#2C2C6C',
            marginBottom: 24
          }}>
            PUBLIC LOGIN
          </Text>

          {/* License ID */}
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#000', marginBottom: 6 }}>
            License ID
          </Text>
          <TextInput
            value={licenseId}
            onChangeText={setLicenseId}
            placeholder="Enter your license id"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            style={{
              backgroundColor: '#2C2C6C',
              color: '#fff',
              borderRadius: 10,
              paddingHorizontal: 16,
              paddingVertical: 12,
              fontSize: 16,
              marginBottom: 20
            }}
          />

          {/* Password */}
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#000', marginBottom: 6 }}>
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#ccc"
            secureTextEntry
            style={{
              backgroundColor: '#2C2C6C',
              color: '#fff',
              borderRadius: 10,
              paddingHorizontal: 16,
              paddingVertical: 12,
              fontSize: 16,
              marginBottom: 28
            }}
          />

          {/* Submit Button */}
          <CustomButton3
            title="Log in"
            handlePress={handleSubmit}
            containerStyles={{
              backgroundColor: '#FFA500',
              borderRadius: 10,
              paddingVertical: 12,
              marginBottom: 20
            }}
            textStyle={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: 16,
              textAlign: 'center'
            }}
            isLoading={isSubmitting}
          />

          {/* Signup Link */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
            <Text style={{ fontSize: 14 }}>Don't have an account?</Text>
            <Link href="/public-register" style={{ marginLeft: 6, fontSize: 14, fontWeight: 'bold', color: '#FB8C00' }}>
              Sign Up
            </Link>
          </View>

          {/* Branding */}
          <View style={{ alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#2C2C6C' }}>SRI LANKA</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2C2C6C' }}>TRAFFIC GUARD</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#2C2C6C' }}>PRO</Text>
          </View>

          <Text style={{
            fontSize: 10,
            color: '#000',
            fontWeight: '600',
            textAlign: 'center',
            textTransform: 'uppercase',
            lineHeight: 16
          }}>
            Real-Time Traffic Violation and Fine Management System
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PublicLogin;
