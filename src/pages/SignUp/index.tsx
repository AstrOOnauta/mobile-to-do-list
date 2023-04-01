import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import {StackScreenProps} from '@react-navigation/stack';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';

import {AuthRoutesParamsList} from 'src/shared/interfaces/routes';
import {routes} from 'src/shared/constants/routes';
import Button from 'src/components/Form/Button';
import Input from 'src/components/Form/Input';

export default function SignUp({
  route,
  navigation,
}: StackScreenProps<AuthRoutesParamsList, 'sign-up'>) {
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
          <VStack my={4} p={4}>
            <Image
              source={require('../../assets/images/logo.png')}
              alt="logo"
              alignSelf="center"
              w={100}
              h={100}
            />
            <Text
              textAlign="center"
              mt={6}
              fontSize="md"
              fontWeight="medium"
              color="gray.700">
              Melhore sua produtividade.{'\n'}
              Cadastre-se no{'  '}
              <Text fontSize="lg" fontWeight="bold" color="violet.600">
                Meteor To Do
              </Text>
              {'  '}
              hoje!
            </Text>
          </VStack>
          <Divider backgroundColor="gray.100" shadow={4} />
          <VStack flex={1} backgroundColor="gray.50" p={4}>
            <Text color="violet.600" fontSize="lg" fontWeight="bold">
              Cadastro
            </Text>
            <Box mt={6}>
              <Text color="gray.700">Nome</Text>
              <Input
                placeholder="Digite o seu nome"
                autoCapitalize="none"
                leftElement={
                  <Box ml={2}>
                    <MaterialIcons
                      name="person-outline"
                      size={24}
                      color={theme.colors.gray[700]}
                    />
                  </Box>
                }
              />
            </Box>
            <Box mt={2}>
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
            <Box mt={2}>
              <Text color="gray.700">Confirmar denha</Text>
              <Input
                isPassword
                placeholder="Confirme sua senha"
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
          </VStack>
          <VStack mb={2} p={4} backgroundColor="gray.50">
            <Button title="Cadastrar" type="primary" />
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => navigation.navigate(routes.auth.login as never)}>
              <Text color="violet.600">Eu já tenho uma conta</Text>
            </TouchableOpacity>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
