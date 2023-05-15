const url = "http://localhost:8080";

export const CREATE_TASK = (body) => {
  const request = {
    body,
    method: "POST",
    name: "ADD_TASK",
    uri: "/task",
  };
  return request;
};

export const DELETE_ALL_TASKS = () => {
  const request = {
    method: "DELETE",
    name: "DELETE_ALL_TASKS",
    uri: "/task/all",
  };
  return request;
};

export const GET_TASKS = (status, { keyword, size }) => {
  const request = {
    method: "GET",
    name: "GET_TASKS",
    uri: `/task/${status}?keyword=${keyword}&size=${size}`,
  };
  return request;
};

export const UPDATE_TASK = (taskId, body) => {
  const request = {
    body,
    method: "PUT",
    name: "GET_TASKS",
    uri: "/task/" + taskId,
  };
  return request;
};
export const serviceRequest = async ({ body, method, name, uri }) => {
  const requestUrl = url + uri;
  const stringifyJson = body ? JSON.stringify(body) : null;
  try {
    const rawResponse = await fetch(requestUrl, {
      body: stringifyJson,
      headers: {
        "Content-Type": "application/json",
      },
      method,
    });
    // 204 not content
    if (rawResponse.status === 204) {
      return;
    }
    const jsonData = await rawResponse.json();
    return jsonData;
  } catch (error) {
    console.error(error);
    throw ("Request Failure for Service", name);
  }
};
