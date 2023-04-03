import React, {useContext, useEffect, useState} from 'react';
import {
  Box,
  FlatList,
  HStack,
  Icon,
  Pressable,
  Skeleton,
  Text,
  theme,
} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import {useIsFocused} from '@react-navigation/native';
import {VictoryLegend, VictoryPie} from 'victory-native';
import {MaterialIcons} from '@expo/vector-icons';
import {addMonths, subMonths, format, isSameMonth} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import {child, get, getDatabase, ref} from 'firebase/database';

import {HomeRoutesParamsList} from 'src/shared/interfaces/routes';
import {Task} from 'src/shared/interfaces/models/Task';
import TaskCard from 'src/components/TaskCard';
import AuthContext from 'src/shared/contexts/AuthContext';

interface GraphicDataProps {
  x: string;
  y: number;
}

export default function Graphics({
  route,
  navigation,
}: StackScreenProps<HomeRoutesParamsList, 'graphics'>) {
  const {user} = useContext(AuthContext);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [graphicData, setGraphicData] = useState<GraphicDataProps[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [fitleredTasks, setFilteredTasks] = useState<Task[]>([]);
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

  function handleDateChange(action: 'prev' | 'next') {
    if (action === 'prev') {
      setSelectedDate(subMonths(selectedDate, 1));
    } else {
      setSelectedDate(addMonths(selectedDate, 1));
    }
  }

  function transformDataToGraphic() {
    const selectedDateTasks = tasks.filter(item => {
      return isSameMonth(new Date(item.createdAt!), selectedDate);
    });

    const doneTasks = selectedDateTasks.filter(item => {
      return item.isDone;
    });

    const undoneTasks = selectedDateTasks.filter(item => {
      return !item.isDone;
    });

    const done =
      (doneTasks?.length * 100) / (doneTasks?.length + undoneTasks?.length);
    const undone = 100 - done;

    let data: GraphicDataProps[] = [];

    if (done > 0 || undone > 0) {
      data = [
        {x: done === 0 ? ' ' : `${done.toFixed(1)}%`, y: done},
        {x: undone === 0 ? ' ' : `${undone.toFixed(1)}%`, y: undone},
      ];
    }

    setGraphicData(data);
    setFilteredTasks(selectedDateTasks);
  }

  useEffect(() => {
    if (isFocused) {
      getTasks();
    }
  }, [isFocused]);

  useEffect(() => {
    if (tasks.length) {
      transformDataToGraphic();
    }
  }, [selectedDate, tasks]);

  return (
    <Box flex={1} backgroundColor="gray.50" pt={8} px={4}>
      <HStack
        w="70%"
        justifyContent="space-between"
        alignItems="center"
        alignSelf="center"
        zIndex={2}>
        <Pressable
          backgroundColor="amber.300"
          p={1}
          borderRadius={8}
          _pressed={{opacity: 0.6}}
          onPress={() => handleDateChange('prev')}>
          <Icon
            as={<MaterialIcons name="chevron-left" />}
            size={6}
            color="violet.600"
          />
        </Pressable>
        <Text fontWeight="semibold" fontSize="lg" color="gray.700">
          {format(selectedDate, 'MMMM, yyyy', {
            locale: ptBR,
          })}
        </Text>
        <Pressable
          backgroundColor="amber.300"
          p={1}
          borderRadius={8}
          _pressed={{opacity: 0.6}}
          onPress={() => handleDateChange('next')}>
          <Icon
            as={<MaterialIcons name="chevron-right" />}
            size={6}
            color="violet.600"
          />
        </Pressable>
      </HStack>
      {isLoading ? (
        <Box flex={1}>
          <HStack mt={12} ml={1} alignItems="flex-end">
            <Skeleton
              borderWidth={1}
              borderColor="coolGray.200"
              startColor="gray.200"
              endColor="gray.400"
              size={32}
              rounded="full"
              ml={12}
              mt={3}
            />
            <Skeleton.Text
              lines={2}
              ml={12}
              w={24}
              startColor="gray.200"
              endColor="gray.400"
            />
          </HStack>
          <Box mt={12}>
            <Skeleton.Text
              lines={1}
              w={32}
              startColor="gray.200"
              endColor="gray.400"
              mb={4}
            />
            {[...Array(3).keys()].map(index => {
              return (
                <Skeleton
                  key={index}
                  my={2}
                  h={16}
                  rounded="md"
                  startColor="gray.200"
                  endColor="gray.400"
                />
              );
            })}
          </Box>
        </Box>
      ) : fitleredTasks.length ? (
        <>
          <Box alignSelf="center" mb={-20}>
            <HStack maxW="100%">
              <VictoryPie
                data={graphicData}
                colorScale={[theme.colors.amber[300], theme.colors.gray[700]]}
                labelRadius={72}
                width={230}
                height={230}
                style={{
                  labels: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fill: theme.colors.gray[700],
                  },
                }}
                animate={{
                  duration: 1000,
                }}
              />
              <VictoryLegend
                x={12}
                y={130}
                colorScale={[theme.colors.amber[300], theme.colors.gray[700]]}
                data={[{name: 'Feitas'}, {name: 'Não feitas'}]}
              />
            </HStack>
          </Box>
          <Text fontSize="lg" fontWeight="bold" color="violet.600" mb={2}>
            Taferas ({fitleredTasks.length})
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={fitleredTasks}
            renderItem={({item, index}) => {
              return <TaskCard key={index} item={item} getTasks={getTasks} />;
            }}
          />
        </>
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
