import React from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Box,
  Divider,
  Image,
  ScrollView,
  Text,
  VStack,
  theme,
} from 'native-base';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {StackScreenProps} from '@react-navigation/stack';

import {AuthRoutesParamsList} from 'src/shared/interfaces/routes';
import {routes} from 'src/shared/constants/routes';
import Input from 'src/components/Form/Input';
import Button from 'src/components/Form/Button';

export default function Login({
  route,
  navigation,
}: StackScreenProps<AuthRoutesParamsList, 'login'>) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
        <ScrollView
          flex={1}
          backgroundColor="white"
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <VStack mt={12} mb={6} p={4}>
            <Image
              source={require('../../assets/images/logo.png')}
              alt="logo"
              alignSelf="center"
            />
            <Text
              textAlign="center"
              mt={6}
              fontSize="md"
              fontWeight="medium"
              color="gray.700">
              Organize suas tarefas facilmente conosco.{'\n'}
              Sejam bem-vindos ao{' '}
              <Text fontSize="lg" fontWeight="bold" color="violet.600">
                Meteor To Do!
              </Text>
            </Text>
          </VStack>
          <Divider backgroundColor="gray.100" shadow={4} />
          <VStack flex={1} backgroundColor="gray.50" p={4}>
            <Text color="violet.600" fontSize="lg" fontWeight="bold">
              Login
            </Text>
            <Box mt={6}>
              <Text color="gray.700">E-mail</Text>
              <Input
                placeholder="Digite o seu e-mail"
                autoCapitalize="none"
                leftElement={
                  <Box ml={2}>
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={24}
                      color={theme.colors.gray[700]}
                    />
                  </Box>
                }
              />
            </Box>
            <Box mt={2}>
              <Text color="gray.700">Senha</Text>
              <Input
                isPassword
                placeholder="Digite a sua senha"
                autoCapitalize="none"
                leftElement={
                  <Box ml={2}>
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={24}
                      color={theme.colors.gray[700]}
                    />
                  </Box>
                }
              />
            </Box>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', marginTop: 6}}
              onPress={() =>
                navigation.navigate(routes.auth.recoveryPassword as never)
              }>
              <Text color="violet.600">Esqueci minha senha</Text>
            </TouchableOpacity>
          </VStack>
          <VStack mb={2} p={4} backgroundColor="gray.50">
            <Button title="Entrar" type="primary" />
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => navigation.navigate(routes.auth.signUp as never)}>
              <Text color="violet.600">Ainda não tenho uma conta</Text>
            </TouchableOpacity>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
