import React from 'react';
import {Modal} from 'native-base';

import {Task} from 'src/shared/interfaces/models/Task';

interface TaskDetailsModalProps {
  item: Task;
  isOpen: boolean;
  closeModal: () => void;
}

export default function TaskDetailsModal({
  item,
  isOpen,
  closeModal,
}: TaskDetailsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.Content w="100%" p={4}>
        <Modal.CloseButton />
        <Modal.Header>{item.title}</Modal.Header>
        <Modal.Body>{item.description}</Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
