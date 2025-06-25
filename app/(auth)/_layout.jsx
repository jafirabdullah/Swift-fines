import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen 
        name="public-login"
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="admin-login"
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="public-register"
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="home"
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="admin-home"
        options={{ headerShown: false }}
      />      
      <Stack.Screen 
      name="add-laws"
      options={{ headerShown: false }}
    />
      <Stack.Screen 
      name="traffic-laws"
      options={{ headerShown: false }}
    />
          <Stack.Screen 
      name="Profile"
      options={{ headerShown: false }}
    />
    <Stack.Screen 
    name="EmergencyNumbers"
    options={{ headerShown: false }} />

    <Stack.Screen
    name='TrafficFines'
    options={{ headerShown: false }} />

    <Stack.Screen 
    name='Search'
    options={{ headerShown:false }}
    />

    <Stack.Screen 
    name='FineHistory'
    options={{ headerShown:false }}
    />
    <Stack.Screen 
    name='MyFines'
    options={{ headerShown:false }}
    />
    <Stack.Screen 
    name='AllFines'
    options={{ headerShown:false }}
    />
        <Stack.Screen 
    name='add-rules'
    options={{ headerShown:false }}
    />
      <Stack.Screen 
    name='Notifications'
    options={{ headerShown:false }}
    />
          <Stack.Screen 
    name='PaymentScreen'
    options={{ headerShown:false }}
    />
          <Stack.Screen 
    name='ReceiptScreen'
    options={{ headerShown:false }}
    />
    </Stack>
    
  );
};

export default AuthLayout;
