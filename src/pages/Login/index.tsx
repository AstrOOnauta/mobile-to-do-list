import React, {useContext, useState} from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
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
import {Controller, FieldValues, useForm} from 'react-hook-form';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

import {app} from '../../../firebaseConfig';

import {AuthRoutesParamsList} from 'src/shared/interfaces/routes';
import {routes} from 'src/shared/constants/routes';
import Input from 'src/components/Form/Input';
import Button from 'src/components/Form/Button';
import {checkEmail} from 'src/shared/utils/checkEmail';
import AuthContext from 'src/shared/contexts/AuthContext';

interface FormProps extends FieldValues {
  email: string;
  password: string;
}

export default function Login({
  route,
  navigation,
}: StackScreenProps<AuthRoutesParamsList, 'login'>) {
  const {saveUser} = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {control, handleSubmit} = useForm<FormProps>();

  const auth = getAuth(app);

  async function onSubmit(form: FormProps) {
    if (!form.email || !form.password) {
      return Alert.alert(
        'Meteor To Do',
        'Por favor preencha os campos necessários para realizar o login!',
      );
    }

    const isValid = checkEmail(form.email);
    if (!isValid) {
      return Alert.alert('Meteor To Do', 'Digite um e-mail válido!');
    }

    if (form.password.length < 6) {
      return Alert.alert(
        'Meteor To Do',
        'Sua senha deve ter no mínimo 6 caracteres!',
      );
    }

    setIsLoading(true);

    await signInWithEmailAndPassword(auth, form.email, form.password)
      .then(res => {
        saveUser(res.user);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        if (error.code === 'auth/user-not-found') {
          return Alert.alert('Meteor To Do', 'E-mail e/ou senha incorreto!');
        }

        if (error.code === 'auth/email-already-in-use') {
          return Alert.alert(
            'Meteor To Do',
            'Este usuário já está logado em outro dispositivo!',
          );
        }

        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Meteor To Do', 'E-mail inválido!');
        }

        Alert.alert('Meteor To Do', error.code);
      });
  }

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
              <Controller
                name="email"
                control={control}
                render={({field: {onChange, value}}) => (
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
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </Box>
            <Box mt={2}>
              <Text color="gray.700">Senha</Text>
              <Controller
                name="password"
                control={control}
                render={({field: {onChange, value}}) => (
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
                    value={value}
                    onChangeText={onChange}
                  />
                )}
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
            <Button
              isLoading={isLoading}
              title="Entrar"
              type="primary"
              onPress={handleSubmit(onSubmit)}
            />
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
