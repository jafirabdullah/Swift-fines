import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';

const ReceiptScreen = () => {
  const { fineAmount, referenceNumber } = useLocalSearchParams();
  const router = useRouter();

  const handleGoBack = () => {
    router.popToTop(); // Navigate back to the home or initial screen
  };

  const handleSharePress = async () => {
    try {
      const htmlContent = `
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
            <h1>Payment Receipt</h1>
            <p><strong>Reference Number:</strong> ${referenceNumber}</p>
            <p><strong>Amount Paid:</strong> LKR ${fineAmount}</p>
            <p><strong>Payment Status:</strong> Success</p>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent, fileName: 'PaymentReceipt.pdf' });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Share Receipt',
        });
      } else {
        Alert.alert('Error', 'Sharing is not available on this device.');
      }
    } catch (error) {
      console.error('Error generating or sharing PDF:', error);
      Alert.alert('Error', 'There was an error while trying to share the receipt.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={require('../../assets/images/logo.png')}  
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Payment Receipt</Text>
      
      <View style={styles.detailContainer}>
        <Text style={styles.textRight}>Reference Number:</Text>
        <Text style={styles.textLeft}>{referenceNumber}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.textRight}>Amount Paid:</Text>
        <Text style={styles.textLeft}>LKR {fineAmount}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.textRight}>Payment Status:</Text>
        <Text style={styles.textLeft}>Success</Text>
      </View>
      
      <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: '#FF8C00' }]} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: '#FF0000', marginTop: 10 }]} onPress={handleSharePress}>
        <Text style={styles.buttonText}>Share Receipt</Text>
      </TouchableOpacity>
      
      <Image 
        source={require('../../assets/images/cards.png')}  
        style={styles.trafficGuardLogo}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  textRight: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'right',
  },
  textLeft: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'left',
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 10,
    width: '80%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  trafficGuardLogo: {
    width: '68%',
    height: '11%',
    marginTop: 30,
  },
});

export default ReceiptScreen;
