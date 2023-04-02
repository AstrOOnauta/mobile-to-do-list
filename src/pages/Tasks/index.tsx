import React from 'react';
import {Box, FlatList, Icon, Text} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import {MaterialIcons} from '@expo/vector-icons';

import {HomeRoutesParamsList} from 'src/shared/interfaces/routes';
import Input from 'src/components/Form/Input';
import TaskCard from 'src/components/TaskCard';

const TASKS_DATA = [
  {
    id: 0,
    title: 'Task1',
    description: 'Lorem Ipsum...',
    isDone: false,
    doneAt: null,
    createdAt: new Date('2023-04-02T12:57:36.458Z'),
  },
  {
    id: 1,
    title: 'Task2',
    description: 'Lorem Ipsum... Lorem Ipsum... Lorem afah aogkoasg aggh',
    isDone: true,
    doneAt: new Date('2023-04-02T12:57:36.458Z'),
    createdAt: new Date('2023-04-02T12:57:36.458Z'),
  },
];

export default function Tasks({
  route,
  navigation,
}: StackScreenProps<HomeRoutesParamsList, 'tasks'>) {
  return (
    <Box flex={1} backgroundColor="gray.50" p={4}>
      <Box mt={2} mb={4}>
        <Input
          placeholder="Filtre suas tarefas..."
          rightElement={
            <Icon as={<MaterialIcons name="search" />} size={6} mr={2.5} />
          }
        />
      </Box>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={TASKS_DATA}
        renderItem={({item, index}) => {
          return <TaskCard key={index} item={item} />;
        }}
      />
    </Box>
  );
}
