import React, {useContext, useEffect, useState} from 'react';
import {Modal} from 'native-base';
import {Controller, FieldValues, useForm} from 'react-hook-form';

import {Task} from 'src/shared/interfaces/models/Task';
import Input from '../Form/Input';
import Button from '../Form/Button';
import AuthContext from 'src/shared/contexts/AuthContext';
import {getDatabase, ref, set} from 'firebase/database';

interface FormProps extends FieldValues {
  title: string;
  description: string;
}
interface TaskDetailsModalProps {
  item: Task;
  getTasks: () => Promise<void>;
  isOpen: boolean;
  closeModal: () => void;
}

export default function TaskDetailsModal({
  item,
  getTasks,
  isOpen,
  closeModal,
}: TaskDetailsModalProps) {
  const {user} = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {control, handleSubmit, setValue} = useForm<FormProps>();
  const db = getDatabase();

  function onSubmit(form: FormProps) {
    setIsLoading(true);

    if (form.title !== item.title || form.description !== item.description) {
      const taskDB = ref(db, `tasks/user${user.uid}/${item.id}`);

      const data = {
        ...item,
        title: form.title,
        description: form.description,
      };

      set(taskDB, data).then(() => {
        getTasks();
      });
    }

    setIsLoading(false);
    closeModal();
  }

  useEffect(() => {
    setValue('title', item.title);
    setValue('description', item.description);
  }, [item]);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.Content w="100%" p={4}>
        <Modal.CloseButton />
        <Modal.Header mt={4}>
          <Controller
            name="title"
            control={control}
            render={({field: {onChange, value}}) => (
              <Input
                placeholder="Digite o título da sua tarefa"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button
            w="100%"
            title="Editar"
            type="primary"
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
