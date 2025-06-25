import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants";
import FormField from '../../components/FormField';
import CustomButton3 from '../../components/CustomButton3';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';

const PublicRegister = () => {
  const [licenseId, setLicenseId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      if (!licenseId || !password || !email || !address) {
        Alert.alert('Please Fill All Fields');
        setIsSubmitting(false);
        return;
      }

      const { data } = await axios.post(
        "http://192.168.8.111:8080/api/v1/auth/register",
        { licenseId, password, email, address }
      );

      Alert.alert(data.message);
      console.log("Signup Data==>", { licenseId, password, email, address });
      setIsSubmitting(false);
      router.push('/public-login');
    } catch (error) {
      Alert.alert(error.response?.data?.message || "An error occurred");
      setIsSubmitting(false);
      console.log(error);
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
            PUBLIC REGISTER
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
              marginBottom: 20
            }}
          />

          {/* Email */}
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#000', marginBottom: 6 }}>
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
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

          {/* Address */}
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#000', marginBottom: 6 }}>
            Address
          </Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            placeholderTextColor="#ccc"
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

          <CustomButton3
            title="Sign Up"
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

          {/* Already have an account */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
            <Text style={{ fontSize: 14 }}>Already have an account?</Text>
            <Link href="/public-login" style={{ marginLeft: 6, fontSize: 14, fontWeight: 'bold', color: '#FB8C00' }}>
              Log In
            </Link>
          </View>

          {/* Bottom image and tagline */}
          <Image
            source={images.cards}
            style={{ alignSelf: 'center', width: '68%', height: 120 }}
            resizeMode="contain"
          />

          <Text style={{
            fontSize: 12,
            color: '#000',
            fontWeight: '600',
            textAlign: 'center',
            marginTop: 20,
            lineHeight: 16,
            textTransform: 'uppercase'
          }}>
            Real-Time Traffic Violation and Fine Management System
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PublicRegister;
