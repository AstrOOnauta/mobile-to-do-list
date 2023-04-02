import React from 'react';
import {Icon, Pressable} from 'native-base';
import {Ionicons} from '@expo/vector-icons';

interface BackButtonProps {
  goBack: () => void;
}

export default function BackButton({goBack}: BackButtonProps) {
  return (
    <Pressable
      position="absolute"
      top={5}
      left={5}
      backgroundColor="amber.300"
      p={2}
      borderRadius={20}
      zIndex={2}
      _pressed={{opacity: 0.6}}
      onPress={goBack}>
      <Icon as={<Ionicons name="arrow-back" />} color="violet.600" size={6} />
    </Pressable>
  );
}
