import React, { useEffect, useState } from "react";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import {
  CREATE_TASK,
  DELETE_ALL_TASKS,
  GET_TASKS,
  UPDATE_TASK,
  serviceRequest,
} from "./util/serviceRequest";
import AddTask from "./components/addTask";
import CountDown from "./components/countDown";
import DeleteAllLink from "./components/deleteAllLink";
import Header from "./components/header";
import Search from "./components/search";
import ServiceRequestAlert from "./components/serviceReqiestAlert";
import TaskList from "./components/taskList";
import { TASK_DONE, TASK_PENDING } from "./constants/constants";

const SEARCH_BY_KEYWORD_DEBOUNCE_LENGHT = 500;

const DEFAULT_STATUS_TASK = { tasks: [] };

const DEFAULT_REQUEST_STATUS_SIZE = [
  { status: TASK_DONE, size: 10 },
  { status: TASK_PENDING, size: -1 },
];

function App() {
  const [doneTasks, setDoneTasks] = useState(DEFAULT_STATUS_TASK);
  const [keyword, setKeyword] = useState("");
  const [pendingTasks, setPendingTasks] = useState(DEFAULT_STATUS_TASK);

  const [showServiceRequestError, setShowServiceRequestError] = useState(false);

  useEffect(() => {
    getTaskServiceRequestDefaultAll();
  }, [keyword]);

  const requestWrapper = async (service) => {
    try {
      const response = await serviceRequest(service);
      return response;
    } catch (error) {
      console.error(error);
      setShowServiceRequestError(true);
      return DEFAULT_STATUS_TASK;
    }
  };

  const createTaskServiceRequest = async (toAddTask) => {
    await requestWrapper(CREATE_TASK(toAddTask));
    await getTasksServiceRequest(TASK_PENDING, keyword);
  };

  const deleteAllTaskServiceRequest = async () => {
    await requestWrapper(DELETE_ALL_TASKS());
    setDoneTasks(DEFAULT_STATUS_TASK);
    setPendingTasks(DEFAULT_STATUS_TASK);
  };

  const getTaskServiceRequestDefaultAll = async () => {
    DEFAULT_REQUEST_STATUS_SIZE.forEach(({ status, size }) => {
      getTasksServiceRequest(status, keyword, size);
    });
  };

  const getTasksServiceRequest = async (status, keyword, size = -1) => {
    const response = await requestWrapper(GET_TASKS(status, { keyword, size }));
    switch (status) {
      case TASK_DONE:
        setDoneTasks(response);
        break;
      case TASK_PENDING:
        setPendingTasks(response);
        break;
      default:
        console.error("incorrect status were passed in", status);
    }
  };

  const updateTaskServiceRequest = async (taskId, toUpdateTask) => {
    await requestWrapper(UPDATE_TASK(taskId, toUpdateTask));
    await getTaskServiceRequestDefaultAll();
  };

  return (
    <ChakraProvider>
      <ServiceRequestAlert
        showRequestAlert={showServiceRequestError}
        setShowRequestAlert={setShowServiceRequestError}
      />
      <Box margin={20}>
        <Flex align="center" direction="row" justifyContent="space-between">
          <Header />
          <DeleteAllLink
            deleteAllTaskServiceRequest={deleteAllTaskServiceRequest}
          />
        </Flex>
        <Flex alignItems="center" justifyContent="end" marginTop={5}>
          <CountDown
            onCountDownIntervalReached={getTaskServiceRequestDefaultAll}
          />
        </Flex>
        <Flex direction="row" justifyContent="space-between" marginTop={10}>
          <AddTask createTaskServiceRequest={createTaskServiceRequest} />
          <Box marginLeft={5}>
            <Search
              debounceLength={SEARCH_BY_KEYWORD_DEBOUNCE_LENGHT}
              onChangeKeyword={setKeyword}
            />
          </Box>
        </Flex>
        <Flex direction="row" marginTop={10}>
          <Box flex={1}>
            <TaskList
              headerLabel="To Do"
              tasks={pendingTasks.tasks}
              updateTaskServiceRequest={updateTaskServiceRequest}
            />
          </Box>
          <Box flex={1} marginLeft={10}>
            <TaskList
              headerLabel="Done"
              tasks={doneTasks.tasks}
              updateTaskServiceRequest={updateTaskServiceRequest}
            />
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
