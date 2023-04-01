import React from 'react';
import {Box, Icon, Image, Text} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';

import {AuthRoutesParamsList} from 'src/shared/interfaces/routes';
import Input from 'src/components/Form/Input';
import Button from 'src/components/Form/Button';
import BackButton from 'src/components/BackButton';

export default function RecoveryPassword({
  route,
  navigation,
}: StackScreenProps<AuthRoutesParamsList, 'recovery-password'>) {
  return (
    <Box flex={1} p={6} backgroundColor="gray.50">
      <BackButton goBack={navigation.goBack} />
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
