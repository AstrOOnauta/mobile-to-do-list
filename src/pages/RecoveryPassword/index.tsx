import React, {useState} from 'react';
import {Alert, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Box, Image, Text} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import {Controller, FieldValues, useForm} from 'react-hook-form';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';

import {AuthRoutesParamsList} from 'src/shared/interfaces/routes';
import Input from 'src/components/Form/Input';
import Button from 'src/components/Form/Button';
import BackButton from 'src/components/BackButton';
import {checkEmail} from 'src/shared/utils/checkEmail';
import {app} from 'firebaseConfig';
import {routes} from 'src/shared/constants/routes';

interface FormProps extends FieldValues {
  email: string;
}

export default function RecoveryPassword({
  route,
  navigation,
}: StackScreenProps<AuthRoutesParamsList, 'recovery-password'>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {control, handleSubmit} = useForm<FormProps>();

  const auth = getAuth(app);

  async function onSubmit(form: FormProps) {
    const isValid = checkEmail(form.email);
    if (!isValid) {
      return Alert.alert('Meteor To Do', 'Digite um e-mail válido!');
    }

    setIsLoading(true);

    await sendPasswordResetEmail(auth, form.email)
      .then(() => {
        setIsLoading(false);
        Alert.alert(
          'Meteor To Do',
          'Redefinição de senha enviado! Check seu e-mail.',
        );
      })
      .catch(error => {
        setIsLoading(false);
        if (error.code === 'auth/user-not-found') {
          return Alert.alert('Meteor To Do', 'E-mail não encontrado!');
        }
        Alert.alert('Meteor To Do', error.message, [
          {
            text: 'Ok',
            onPress: () => navigation.navigate(routes.auth.login as never),
          },
        ]);
      });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            Adicione o endereço de e-mail da sua conta para enviarmos
            informações sobre a redefinição de senha
          </Text>
        </Box>
        <Text color="gray.700">E-mail</Text>
        <Controller
          name="email"
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              autoCapitalize="none"
              placeholder="Digite seu e-mail"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <Box mt={6}>
          <Button
            isLoading={isLoading}
            title="Enviar"
            type="primary"
            onPress={handleSubmit(onSubmit)}
          />
        </Box>
      </Box>
    </TouchableWithoutFeedback>
  );
}
