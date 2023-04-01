import React, {useState} from 'react';
import {Input as NBInput, IInputProps, Pressable, Icon} from 'native-base';
import {MaterialCommunityIcons} from '@expo/vector-icons';

interface InputProps extends IInputProps {
  isPassword?: boolean;
}

export default function Input({isPassword, ...rest}: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <NBInput
      backgroundColor="white"
      secureTextEntry={isPassword && !showPassword}
      rightElement={
        isPassword ? (
          <Pressable mr={2.5} onPress={() => setShowPassword(!showPassword)}>
            <Icon
              as={
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                />
              }
              size={6}
              color="gray.700"
            />
          </Pressable>
        ) : undefined
      }
      _input={{
        selectionColor: 'rgba(0,0,0,.2)',
        cursorColor: 'rgba(0,0,0,.2)',
      }}
      _focus={{borderColor: 'violet.600'}}
      {...rest}
    />
  );
}
