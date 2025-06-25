import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  ScrollView,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StripeProvider } from '@stripe/stripe-react-native';
import { STRIPE_PUBLISHABLE_KEY } from '../config';
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import CustomButton3 from "../components/CustomButton3";

const { width, height } = Dimensions.get('window');

export default function App() {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <ImageBackground
        source={images.background}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={images.logo}
                style={{ width: width * 0.4, height: height * 0.1, marginBottom: 20 }}
                resizeMode="contain"
              />
              <Image
                source={images.cards}
                style={{ width: width * 0.7, height: height * 0.12, marginBottom: 20 }}
                resizeMode="contain"
              />
              <CustomButton
                title="PUBLIC LOGIN"
                handlePress={() => router.push('/public-login')}
                containerStyles={{ width: '100%', marginTop: 28 }}
              />
              <CustomButton
                title="ADMIN LOGIN"
                handlePress={() => router.push('/admin-login')}
                containerStyles={{ width: '100%', marginTop: 28 }}
              />
              <CustomButton3
                title="SOS"
                handlePress={() => router.push('/sos')}
                containerStyles={{ width: '100%', marginTop: 28 }}
              />
              <Text style={{ marginTop: 40, textAlign: 'center', color: 'white', fontSize: 14 }}>
                Real-Time Traffic Violation and Fine Management System
              </Text>
            </View>
          </ScrollView>
          <StatusBar backgroundColor='#161622' style='light' />
        </SafeAreaView>
      </ImageBackground>
    </StripeProvider>
  );
}
