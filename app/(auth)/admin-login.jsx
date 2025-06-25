import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants";
import FormField from '../../components/FormField';
import CustomButton3 from '../../components/CustomButton3';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminLogin = () => {
  const [accessId, setAccessId] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      if (!accessId || !password) {
        Alert.alert('Please Fill All Fields');
        setIsSubmitting(false);
        return;
      }

      const { data } = await axios.post(
        "http://192.168.8.111:8080/api/v1/admin/admin-login",
        { accessId, password }
      );

      await AsyncStorage.setItem('token', data.token);
      Alert.alert(data.message);
      console.log("Login Data==>", { accessId, password });
      setIsSubmitting(false);
      router.push('/admin-home');
    } catch (error) {
      Alert.alert(error.response?.data?.message || "An error occurred");
      setIsSubmitting(false);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 40 }}>
          <View style={{ justifyContent: 'center', width: '100%' }}>
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#2B286D',
              marginBottom: 24,
            }}>
              ADMIN LOGIN
            </Text>

            {/* Access ID */}
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#000', marginBottom: 6 }}>
              Access ID
            </Text>
            <TextInput
              value={accessId}
              onChangeText={setAccessId}
              placeholder="Enter your access id"
              placeholderTextColor="#ccc"
              keyboardType="default"
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

            <CustomButton3
              title="Log in"
              handlePress={handleSubmit}
              containerStyles={{
                backgroundColor: '#FFA500',
                borderRadius: 10,
                paddingVertical: 12,
              }}
              textStyle={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: 16,
                textAlign: 'center'
              }}
              isLoading={isSubmitting}
            />

            {isSubmitting && (
              <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
            )}

            <Image
              source={images.cards}
              style={{
                alignSelf: 'center',
                width: '68%',
                height: 120,
                marginTop: 40,
              }}
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
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AdminLogin;
