import React, {useState} from 'react';
import {Alert} from 'react-native';
import {Checkbox, HStack, Icon, Pressable, Text, VStack} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons';

import {Task} from 'src/shared/interfaces/models/Task';
import {format, isToday, isYesterday} from 'date-fns';
import TaskDetailsModal from '../TaskDetailsModal';

interface TaskCardProps {
  item: Task;
}

export default function TaskCard({item}: TaskCardProps) {
  const [isChecked, setIsChecked] = useState<boolean>(item.isDone);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleDeleteTask() {
    Alert.alert(
      'Meteor To Do',
      `Tem certeza que deseja excluir a tarefa ${item.title}`,
      [
        {text: 'Cancelar'},
        {
          text: '',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
  }

  function handleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function getDate() {
    const date = new Date(item.createdAt as Date);
    if (isToday(date)) {
      return format(date, 'HH:mm');
    }
    if (isYesterday(date)) {
      return 'yesterday';
    }

    return format(date, 'dd/MM/yy');
  }

  return (
    <>
      <Pressable
        shadow={2}
        backgroundColor={isChecked ? 'amber.300' : 'white'}
        borderColor="gray.300"
        borderWidth={1}
        borderRadius={8}
        flexDirection="row"
        alignItems="center"
        mb={4}
        p={4}
        _pressed={{opacity: 0.6}}
        onPress={handleModal}>
        <HStack alignItems="center">
          <Checkbox
            value=""
            isChecked={isChecked}
            onChange={setIsChecked}
            accessibilityLabel="Checkbox"
            colorScheme="purple"
          />
          <VStack ml={4} w="80%">
            <Text
              color="gray.700"
              fontWeight="bold"
              fontSize="md"
              textDecorationLine={isChecked ? 'line-through' : 'none'}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.title}
            </Text>
            <HStack alignItems="center">
              <Text color="gray.500" fontWeight="bold" fontSize="xs">
                ({getDate()}){'  '}
              </Text>
              <Text
                w="85%"
                color="gray.500"
                fontSize="sm"
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.description}
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <Pressable _pressed={{opacity: 0.6}} p={2} onPress={handleDeleteTask}>
          <Icon
            as={<MaterialIcons name="delete" />}
            size={6}
            color="danger.700"
          />
        </Pressable>
      </Pressable>
      <TaskDetailsModal
        item={item}
        isOpen={isModalOpen}
        closeModal={handleModal}
      />
    </>
  );
}
