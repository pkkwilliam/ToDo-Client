import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  HStack,
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
            Http Request Failed, Please Check Status of Service API
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
