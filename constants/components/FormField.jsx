import { View, Text, TextInput, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { useState } from 'react';
import { icons, images } from "../constants";

const FormField = ({ title, value, placeHolder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black-100 font-pmedium">{title}</Text>

      <View className="border-2 border-darkPurple w-full h-16 px-4 bg-purple rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput 
        className="flex-1 text-white font-psemibold text-base"
        value={value}
        placeholder={placeHolder}
        placeholderTextColor="#D3D3D3"
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : 
              icons.eyeHide
            } className="w-6 h-6 resizeMode='contain'"/>
          </TouchableOpacity>
        )}
      </View>
    </View>
    
  )
}

export default FormField