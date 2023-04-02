import React, {useContext, useState} from 'react';
import {
  Alert,
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
import {Controller, FieldValues, useForm} from 'react-hook-form';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  User as FirebaseUserType,
} from 'firebase/auth';

import {AuthRoutesParamsList} from 'src/shared/interfaces/routes';
import {routes} from 'src/shared/constants/routes';
import Button from 'src/components/Form/Button';
import Input from 'src/components/Form/Input';
import {app} from 'firebaseConfig';
import {checkEmail} from 'src/shared/utils/checkEmail';
import AuthContext from 'src/shared/contexts/AuthContext';

interface FormProps extends FieldValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp({
  route,
  navigation,
}: StackScreenProps<AuthRoutesParamsList, 'sign-up'>) {
  const {saveUser} = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {control, handleSubmit} = useForm<FormProps>();

  const auth = getAuth(app);

  async function onSubmit(form: FormProps) {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return Alert.alert(
        'Meteor To Do',
        'Por favor preencha os campos necessários para realizar o login!',
      );
    }

    const isValid = checkEmail(form.email);
    if (!isValid) {
      return Alert.alert('Meteor To Do', 'Digite um e-mail válido!');
    }

    if (form.password !== form.confirmPassword) {
      return Alert.alert('Meteor To Do', 'As duas senhas não coincidem!');
    }

    if (form.password.length < 6) {
      return Alert.alert(
        'Meteor To Do',
        'Sua senha deve ter no mínimo 6 caracteres!',
      );
    }

    setIsLoading(true);
    await createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(() => {
        updateProfile(auth.currentUser as FirebaseUserType, {
          displayName: form.name,
        })
          .then(async () => {
            Alert.alert('Meteor To Do', 'Usuário criado com sucesso!');
            await saveUser(auth.currentUser as FirebaseUserType);
            setIsLoading(false);
          })
          .catch(error => {
            setIsLoading(false);
            Alert.alert('Meteor To Do', error.message);
          });
      })
      .catch(error => {
        setIsLoading(false);

        if (error.code === 'auth/email-already-in-use') {
          return Alert.alert('Meteor To Do', 'E-mail já cadastrado!');
        }
        Alert.alert('Meteor To Do', error.message);
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
              <Controller
                name="name"
                control={control}
                render={({field: {onChange, value}}) => (
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
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </Box>
            <Box mt={2}>
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
            <Box mt={2}>
              <Text color="gray.700">Confirmar denha</Text>
              <Controller
                name="confirmPassword"
                control={control}
                render={({field: {onChange, value}}) => (
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
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </Box>
          </VStack>
          <VStack mb={2} p={4} backgroundColor="gray.50">
            <Button
              isLoading={isLoading}
              title="Cadastrar"
              type="primary"
              onPress={handleSubmit(onSubmit)}
            />
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
