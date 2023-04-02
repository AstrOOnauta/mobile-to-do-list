import React, {useEffect, useState} from 'react';
import {Box, FlatList, HStack, Icon, Pressable, Text, theme} from 'native-base';
import {StackScreenProps} from '@react-navigation/stack';
import {VictoryLegend, VictoryPie} from 'victory-native';
import {MaterialIcons} from '@expo/vector-icons';
import {addMonths, subMonths, format, isSameMonth} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {HomeRoutesParamsList} from 'src/shared/interfaces/routes';
import {Task} from 'src/shared/interfaces/models/Task';
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
  {
    id: 3,
    title: 'Task3',
    description: 'Lorem Ipsum... Lorem Ipsum... Lorem afah aogkoasg aggh',
    isDone: true,
    doneAt: new Date('2023-04-02T12:57:36.458Z'),
    createdAt: new Date('2023-04-02T12:57:36.458Z'),
  },
];

interface GraphicDataProps {
  x: string;
  y: number;
}

export default function Graphics({
  route,
  navigation,
}: StackScreenProps<HomeRoutesParamsList, 'graphics'>) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [graphicData, setGraphicData] = useState<GraphicDataProps[]>([]);
  const [fitleredTasks, setFilteredTasks] = useState<Task[]>([]);

  function handleDateChange(action: 'prev' | 'next') {
    if (action === 'prev') {
      setSelectedDate(subMonths(selectedDate, 1));
    } else {
      setSelectedDate(addMonths(selectedDate, 1));
    }
  }

  function transformDataToGraphic() {
    const selectedDateTasks = TASKS_DATA.filter(item => {
      return isSameMonth(item.createdAt, selectedDate);
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

    if (done > 0 && undone > 0) {
      data = [
        {x: done === 0 ? ' ' : `${done.toFixed(1)}%`, y: done},
        {x: undone === 0 ? ' ' : `${undone.toFixed(1)}%`, y: undone},
      ];
    }

    setGraphicData(data);
    setFilteredTasks(selectedDateTasks);
  }

  useEffect(() => {
    transformDataToGraphic();
  }, [selectedDate, TASKS_DATA]);

  return (
    <Box flex={1} backgroundColor="gray.50" pt={8} px={4}>
      <HStack
        w="70%"
        justifyContent="space-between"
        alignItems="center"
        alignSelf="center">
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
      <Box alignSelf="center" mb={-20}>
        {graphicData.length ? (
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
        ) : (
          <Box
            width={250}
            height={250}
            alignItems="center"
            justifyContent="center">
            <Text>Nenhuma tarefa registrada...</Text>
          </Box>
        )}
      </Box>
      {fitleredTasks.length ? (
        <>
          <Text fontSize="lg" fontWeight="bold" color="violet.600" mb={2}>
            Taferas ({fitleredTasks.length})
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={fitleredTasks}
            renderItem={({item, index}) => {
              return <TaskCard key={index} item={item} />;
            }}
          />
        </>
      ) : null}
    </Box>
  );
}
