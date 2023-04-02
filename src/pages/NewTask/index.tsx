import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {Keyboard} from 'react-native';
import {Box, Divider, Image, ScrollView, Text} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import {Controller, FieldValues, useForm} from 'react-hook-form';

import {AppRoutesParamsList} from 'src/shared/interfaces/routes';
import BackButton from 'src/components/BackButton';
import Input from 'src/components/Form/Input';
import Button from 'src/components/Form/Button';

interface FormProps extends FieldValues {
  title: string;
  description: string;
}

export default function NewTask({
  route,
  navigation,
}: StackScreenProps<AppRoutesParamsList, 'new-task'>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {control, handleSubmit} = useForm<FormProps>();

  function onSubmit(form: FormProps) {
    if (!form.title || !form.description) {
      return Alert.alert(
        'Meteor To Do',
        'Por favor preencha os campos necessários para criar a tarefa!',
      );
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box flex={1} backgroundColor="white">
        <BackButton goBack={navigation.goBack} />
        <Box mt={8} mb={6} px={4} alignItems="center">
          <Image
            w={140}
            h={140}
            source={require('../../assets/images/new-idea-illustration.png')}
            alt="New task"
          />
          <Text color="violet.600" fontSize="xl" fontWeight="bold" mt={4}>
            Nova Tarefa
          </Text>
        </Box>
        <Divider backgroundColor="gray.100" shadow={4} />
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
          <ScrollView
            flex={1}
            backgroundColor="white"
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <Box backgroundColor="gray.50" flex={1} p={4} pb={0}>
              <Box mt={2}>
                <Text color="gray.700">título</Text>
                <Controller
                  name="title"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Input
                      placeholder="Digite otítulo da sua tarefa"
                      autoCapitalize="none"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
              </Box>
              <Box mt={2} mb={4}>
                <Text color="gray.700">Descrição</Text>
                <Controller
                  name="description"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Input
                      multiline={true}
                      numberOfLines={10}
                      textAlignVertical="top"
                      placeholder="Descreva sua tarefa"
                      autoCapitalize="none"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
              </Box>
            </Box>
            <Button
              isLoading={isLoading}
              title="Criar tarefa"
              type="primary"
              mb={0}
              borderRadius={0}
              onPress={handleSubmit(onSubmit)}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </Box>
    </TouchableWithoutFeedback>
  );
}
