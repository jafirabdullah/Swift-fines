import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

const CustomButton1 = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        { 
          marginTop:100,
          marginLeft: 130,
          backgroundColor: '#FF8C00', 
          borderRadius: 10, 
          maxHeightHeight: 5, 
          maxWidth: 120,
          justifyContent: 'center', 
          alignItems: 'center',
          paddingVertical: 10, 
          paddingHorizontal: 20 
        },
        containerStyles,
        isLoading && { opacity: 0.5 }
      ]}
      disabled={isLoading}
    >
      <Text style={[{ color: 'black', fontFamily: 'psemibold', fontSize: 16 , fontWeight: 'bold'}, textStyles] }>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton1;
