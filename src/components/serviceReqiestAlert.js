import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  HStack,
  Link,
} from "@chakra-ui/react";

const ServiceRequestAlert = (props) => {
  const { showRequestAlert, setShowRequestAlert } = props;
  return showRequestAlert ? (
    <Alert justifyContent="space-between" status="error">
      <HStack>
        <AlertIcon />
        <Box>
          <AlertTitle>Request Failed</AlertTitle>
          <AlertDescription>
            Http Request Failed, Please Run and Check Status of Service API.(
            <Link
              href="https://github.com/pkkwilliam/Todo-Service"
              target="_blank"
            >
              https://github.com/pkkwilliam/Todo-Service
            </Link>
            )
          </AlertDescription>
        </Box>
      </HStack>
      <CloseButton
        position="relative"
        onClick={() => setShowRequestAlert(false)}
      />
    </Alert>
  ) : null;
};

export default ServiceRequestAlert;
