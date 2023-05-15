import { Box, Checkbox, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { TASK_DONE, TASK_PENDING } from "../constants/constants";

const TaskList = (props) => {
  const { headerLabel, updateTaskServiceRequest, tasks } = props;

  const onClickUpdate = (taskId, task) => {
    updateTaskServiceRequest(taskId, task);
  };

  const DisplayTasks = tasks.map((task) => {
    const isDone = task.status === TASK_DONE;
    return (
      <Box key={task.id}>
        <Checkbox
          isChecked={isDone}
          onChange={() =>
            onClickUpdate(task.id, {
              ...task,
              status: isDone ? TASK_PENDING : TASK_DONE,
            })
          }
        >
          {task.description}
          <Text color="grey" fontSize="xs">
            {isDone
              ? `Completed at: ${new Date(task.completeTime).toLocaleString()}`
              : `Created at ${new Date(task.createTime).toLocaleString()}`}
          </Text>
        </Checkbox>
      </Box>
    );
  });
  return (
    <Stack>
      <HStack align="end">
        <Heading size="md">{headerLabel}</Heading>
        <Text color="grey" fontSize="xs">
          {`Total: ${tasks.length}`}
        </Text>
      </HStack>
      {DisplayTasks}
    </Stack>
  );
};

export default TaskList;
