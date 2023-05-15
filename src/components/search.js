import React, { useState } from "react";
import { Input } from "@chakra-ui/react";

const Search = (props) => {
  const [lastChangeTime, setLastChangeTime] = useState(new Date());
  const [previousRequestedKeyword, setPreviousRequestedKeyword] = useState("");
  const { debounceLength, onChangeKeyword } = props;

  const debounceOnChangeKeyword = (keyword) => {
    const current = new Date();
    const difference = current - lastChangeTime;
    if (difference < debounceLength) {
      console.debug(
        "debouce in action, application will request once debounce reached"
      );
      return;
    }
    if (keyword === previousRequestedKeyword) {
      console.debug(
        "keyword are the same from the previous, there is not need to request again"
      );
      return;
    }
    setLastChangeTime(new Date());
    setPreviousRequestedKeyword(keyword);
    onChangeKeyword(keyword);
  };

  return (
    <Input
      onBlur={(event) => debounceOnChangeKeyword(event.target.value)}
      onChange={(event) => debounceOnChangeKeyword(event.target.value)}
      onFocus={() => setLastChangeTime(new Date())}
      placeholder="Search"
    />
  );
};

export default Search;
