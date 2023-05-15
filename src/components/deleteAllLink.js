import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";

const DeleteAllLink = (props) => {
  const { deleteAllTaskServiceRequest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const onClickDelete = async () => {
    await deleteAllTaskServiceRequest();
    onClose();
  };

  return (
    <>
      <Link color="blue" onClick={onOpen}>
        Delete all tasks
      </Link>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete All Tasks?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            You sure you want to delete all the tasks? This is a one way trip.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={onClickDelete}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteAllLink;
