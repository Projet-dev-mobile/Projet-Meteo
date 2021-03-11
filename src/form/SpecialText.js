import React from "react";
import { StyleSheet, Text } from "react-native";

const SpecialText = (item) => {
  return (
    <Text
      style={
        (item.style,
        {
          color: item.style.fontColor,
          paddingLeft: item.style.paddingLeft,
          fontFamily: "Comfortaa",
          fontSize: item.style.fontSize,
        })
      }
    >
      {item.text}
    </Text>
  );
};

export default SpecialText;

const styles = StyleSheet.create({});
