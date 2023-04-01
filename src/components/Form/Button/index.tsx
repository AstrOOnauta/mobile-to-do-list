import React from 'react';
import {Button as NRButton, IButtonProps, Text} from 'native-base';

interface ButtonProps extends IButtonProps {
  title: string;
  type: 'primary' | 'secondary';
}

export default function Button({title, type, ...rest}: ButtonProps) {
  return (
    <NRButton
      backgroundColor={type === 'primary' ? 'violet.600' : 'transparent'}
      borderColor={type === 'primary' ? 'none' : 'violet.600'}
      borderWidth={type === 'primary' ? 0 : 1}
      mb={4}
      _pressed={{opacity: type === 'primary' ? 0.6 : 0.5}}
      {...rest}>
      <Text
        color={type === 'primary' ? 'gray.50' : 'violet.600'}
        fontSize="md"
        fontWeight="bold">
        {title}
      </Text>
    </NRButton>
  );
}
