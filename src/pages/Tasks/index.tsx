import React, {useContext, useEffect, useState} from 'react';
import {Box, FlatList, Icon, Skeleton, Text} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {MaterialIcons} from '@expo/vector-icons';
import {child, get, getDatabase, ref} from 'firebase/database';

import {HomeRoutesParamsList} from 'src/shared/interfaces/routes';
import Input from 'src/components/Form/Input';
import TaskCard from 'src/components/TaskCard';
import AuthContext from 'src/shared/contexts/AuthContext';
import {Task} from 'src/shared/interfaces/models/Task';

export default function Tasks({
  route,
  navigation,
}: StackScreenProps<HomeRoutesParamsList, 'tasks'>) {
  const {user} = useContext(AuthContext);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isFocused = useIsFocused();
  const db = getDatabase();

  async function getTasks() {
    setIsLoading(true);
    const tasksDB = ref(db);

    await get(child(tasksDB, `tasks/user${user.uid}`))
      .then(async snapshot => {
        setTasks([]);
        const data = await snapshot.val();

        const dataKeys = Object.keys(data);

        for (let i = 0; i < dataKeys.length; i++) {
          setTasks(oldTasks => [...oldTasks, data[dataKeys[i]]] as Task[]);
        }
      })
      .catch(error => {
        console.log(error.message);
      });

    setIsLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      getTasks();
    }
  }, [isFocused]);

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
      {isLoading ? (
        [...Array(6).keys()].map(index => {
          return (
            <Skeleton
              key={index}
              my={2}
              h={16}
              rounded="md"
              startColor="gray.300"
            />
          );
        })
      ) : tasks.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tasks}
          renderItem={({item, index}) => {
            return <TaskCard key={index} item={item} getTasks={getTasks} />;
          }}
        />
      ) : (
        <Box flex={1} alignItems="center" justifyContent="center" mt={-20}>
          <Text color="gray.500" fontSize="lg" fontWeight="medium">
            Nenhuma tarefa registrada...
          </Text>
        </Box>
      )}
    </Box>
  );
}
