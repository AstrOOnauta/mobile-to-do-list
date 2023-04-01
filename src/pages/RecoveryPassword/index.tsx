import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, Icon, Image, Pressable, Text} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';

import {AuthRoutesParamsList} from 'src/shared/interfaces/routes';
import Input from 'src/components/Form/Input';
import Button from 'src/components/Form/Button';

export default function RecoveryPassword({
  route,
  navigation,
}: StackScreenProps<AuthRoutesParamsList, 'recovery-password'>) {
  return (
    <Box flex={1} p={6} backgroundColor="gray.50">
      <Pressable
        position="absolute"
        top={5}
        left={5}
        backgroundColor="amber.300"
        p={2}
        borderRadius={20}
        _pressed={{opacity: 0.6}}
        onPress={navigation.goBack}>
        <Icon as={<Ionicons name="arrow-back" />} color="violet.600" size={6} />
      </Pressable>
      <Image
        alignSelf="center"
        source={require('../../assets/images/lock-illustration.png')}
        alt="Lock illustration"
        w={150}
        h={175}
      />
      <Box mt={4} mb={10}>
        <Text
          mb={2}
          textAlign="center"
          color="violet.600"
          fontWeight="bold"
          fontSize="2xl">
          Recuperar senha
        </Text>
        <Text textAlign="center" color="gray.700" fontWeight="medium">
          Adicione o endereço de e-mail da sua conta para enviarmos informações
          sobre a redefinição de senha
        </Text>
      </Box>
      <Text color="gray.700">E-mail</Text>
      <Input placeholder="Digite seu e-mail" />
      <Box mt={6}>
        <Button title="Enviar" type="primary" />
      </Box>
    </Box>
  );
}
