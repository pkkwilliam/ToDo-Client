import React, { useEffect, useState } from "react";
import { REFRESH_INTERVAL_SECOND } from "../constants/constants";
import { HStack, Link, Text } from "@chakra-ui/react";

const CountDown = (props) => {
  const { onCountDownIntervalReached } = props;
  const [refreshCountDown, setRefreshCountDown] = useState(
    REFRESH_INTERVAL_SECOND
  );

  useEffect(() => {
    const autoRefreshInterval = setInterval(() => {
      setRefreshCountDown((previousCountDown) => {
        if (previousCountDown > 0) {
          return previousCountDown - 1;
        }
        onCountDownIntervalReached();
        return REFRESH_INTERVAL_SECOND;
      });
    }, 1000);
    return () => {
      clearInterval(autoRefreshInterval);
    };
  }, []);

  return (
    <HStack color="blue">
      <Text>{refreshCountDown}s</Text>
      <Link
        onClick={() => {
          setRefreshCountDown(REFRESH_INTERVAL_SECOND);
          onCountDownIntervalReached();
        }}
      >
        Refresh
      </Link>
    </HStack>
  );
};

export default CountDown;
