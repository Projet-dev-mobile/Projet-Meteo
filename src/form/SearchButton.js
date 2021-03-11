import React from "react";
import { Button, Icon } from "@ui-kitten/components";

const SearchIcon = (props) => <Icon name="search" {...props} />;

const SearchButton = () => {
  return (
    <Button title="Search" accessoryLeft={SearchIcon}>
      Search
    </Button>
  );
};

export default SearchButton;
