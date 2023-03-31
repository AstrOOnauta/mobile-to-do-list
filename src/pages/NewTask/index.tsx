import React from 'react';
import {Box, Text} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';

import {AppRoutesParamsList} from 'src/shared/interfaces/routes';

export default function NewTask({
  route,
  navigation,
}: StackScreenProps<AppRoutesParamsList, 'new-task'>) {
  return (
    <Box
      flex={1}
      backgroundColor="gray.50"
      alignItems="center"
      justifyContent="center">
      <Text>New Task</Text>
    </Box>
  );
}
