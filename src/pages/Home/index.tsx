import React, {useContext} from 'react';
import {Box, HStack, Icon, Pressable, Text, VStack} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';

import HomeRoutes from 'src/routes/home.routes';
import {AppRoutesParamsList} from 'src/shared/interfaces/routes';
import AuthContext from 'src/shared/contexts/AuthContext';
import {routes} from 'src/shared/constants/routes';
import {Alert} from 'react-native';

export default function Home({
  route,
  navigation,
}: StackScreenProps<AppRoutesParamsList, 'home'>) {
  const {user, removeUser} = useContext(AuthContext);

  function handleSignOut() {
    Alert.alert(
      'Meteor To Do',
      'Tem certeza que deseja deslogar do Meteor To Do?',
      [
        {text: 'Cancel'},
        {
          text: 'Deslogar',
          onPress: () => removeUser(),
        },
      ],
      {cancelable: false},
    );
  }

  return (
    <VStack flex={1}>
      <Pressable
        position="absolute"
        right={4}
        bottom={4}
        p={4}
        backgroundColor="amber.300"
        borderRadius={50}
        shadow={8}
        zIndex={2}
        _pressed={{opacity: 0.6}}
        onPress={() => navigation.navigate(routes.app.newTask as never)}>
        <Icon
          as={<MaterialIcons name="add" />}
          color="violet.600"
          size={7}
          pl={0.5}
        />
      </Pressable>
      <HStack
        backgroundColor="white"
        p={4}
        alignItems="flex-end"
        justifyContent="space-between">
        <Box>
          <Text fontSize="xl" fontWeight="medium" color="violet.600">
            Meteor To Do
          </Text>
          <Text fontSize="sm" color="gray.700">
            Usuário: {user.displayName}
          </Text>
        </Box>
        <Pressable
          backgroundColor="amber.300"
          p={2}
          borderRadius={20}
          _pressed={{opacity: 0.6}}
          onPress={handleSignOut}>
          <Icon
            as={<Ionicons name="exit-outline" />}
            color="violet.600"
            size={6}
            pl={0.5}
          />
        </Pressable>
      </HStack>
      <HomeRoutes />
    </VStack>
  );
}
