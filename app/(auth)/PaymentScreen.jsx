import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { CardField } from '@stripe/stripe-react-native';
import CustomButton1 from '../../components/CustomButton1';
import { useRouter } from 'expo-router';
import CustomButton5 from '../../components/CustomButton5';

const PaymentScreen = () => {
  const fineName = "Driving without a license"; // Replace with dynamic fine name if available
  const fineAmount = 25000; // Replace with dynamic fine amount if available
  const referenceNumber = "REF123456"; // Generate or fetch the reference number as needed

  const [cardDetails, setCardDetails] = useState({});
  const [cardholderName, setCardholderName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();

  const handlePayPress = () => {
    if (!cardDetails?.complete) {
      Alert.alert('Incomplete Card Details', 'Please enter complete card details.');
      return;
    }

    if (!cardholderName) {
      Alert.alert('Missing Cardholder Name', 'Please enter the cardholder name.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Payment Successful', `Your payment of LKR ${fineAmount} for "${fineName}" was successful!`);
      
      // Navigate to the ReceiptScreen
      router.push({
        pathname: '/ReceiptScreen', // Adjust the path as needed
        params: { fineAmount, referenceNumber },
      });
    }, 1500); // Simulate a payment process
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={styles.title}>PAY FINE</Text>
            <Text style={styles.label}>Fine :</Text>
            <Text style={styles.fineDetails}>{fineName}</Text>
            <Text style={styles.label}>Amount :</Text>
            <Text style={styles.fineDetails}>LKR {fineAmount}</Text>

            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.cardText}>
                  {cardDetails?.brand ? `${cardDetails.brand.toUpperCase()} **** **** **** ${cardDetails?.last4}` : "Card Number"}
                </Text>
                <Text style={styles.cardExpiry}>
                  {cardDetails?.expiryMonth ? `${cardDetails.expiryMonth}/${cardDetails.expiryYear}` : "MM/YY"}
                </Text>
                <Text style={styles.cardName}>{cardholderName || "Card Holder name"}</Text>
              </View>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Card Holder name"
              value={cardholderName}
              onChangeText={setCardholderName}
              placeholderTextColor="#FFFFFF"
            />

            <CardField
              postalCodeEnabled={false}
              placeholders={{ number: 'Card Number', cvv: 'CVV' }}
              cardStyle={styles.cardInput}
              style={styles.cardFieldContainer}
              onCardChange={(details) => {
                if (details.complete) {
                  setCardDetails(details);
                } else {
                  setCardDetails({});
                }
              }}
            />

                        <CustomButton5
              title="Pay Now"
              handlePress={handlePayPress}
              isLoading={isSubmitting}
            />
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft:10,
    color: '#2B296D'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    marginLeft:10,
  },
  fineDetails: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
    marginLeft:10,
  },
  cardContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: 190,
    borderRadius: 12,
    backgroundColor: '#2B296D',
    padding: 50,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardExpiry: {
    color: 'white',
    fontSize: 16,
  },
  input: {
    height: 50,
    width: '90%',
    marginLeft: 15,
    borderColor: '#2B296D',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: '#2B296D',
    color: '#FFFFFF',
  },
  cardFieldContainer: {
    height: 50,
    width: '90%',
    marginLeft: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#2B296D',
  },
  cardInput: {
    backgroundColor: '#2B296D',
    borderRadius: 10,
    color: '#FFFFFF',
  },
});

export default PaymentScreen;
