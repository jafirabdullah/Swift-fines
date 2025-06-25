import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

const CustomButton2 = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        { 
          marginTop:10,
          marginRight:20,
          marginLeft:15,
          backgroundColor: '#2B286D', 
          borderRadius: 20, 
          maxHeightHeight: 5, 
          maxWidth: 150,
          maxHeight: 250,
          justifyContent: 'center', 
          alignItems: 'center',
          paddingVertical: 20, 
          paddingHorizontal: 20, 
        },
        containerStyles,
        isLoading && { opacity: 0.5 }
      ]}
      disabled={isLoading}
    >
      <Text style={[{ color: 'white', fontFamily: 'psemibold', fontSize: 12 , fontWeight: 'bold'}, textStyles] }>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton2;