import React, { useState } from "react";
import { Button, Flex, Input } from "@chakra-ui/react";

const AddTask = (props) => {
  const { createTaskServiceRequest } = props;
  const [value, setValue] = useState("");

  // should be using onBlur if the form is large to avoid too many render
  const onChangeInputField = (event) => {
    setValue(event.target.value);
  };

  const onClickAddTask = () => {
    createTaskServiceRequest({ description: value });
    setValue("");
  };

  return (
    <Flex>
      <Input onChange={onChangeInputField} placeholder="" value={value} />
      <Button
        colorScheme="orange"
        isDisabled={value.length <= 0}
        marginLeft={5}
        onClick={onClickAddTask}
      >
        Add
      </Button>
    </Flex>
  );
};

export default AddTask;
