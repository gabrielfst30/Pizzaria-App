import React from "react";
import { View, Text, StyleSheet } from "react-native";


import { CategoryProps } from "../../pages/Order";

interface ModalPickerProps{
    options: CategoryProps[];
}


export function ModalPicker() {
  return (
    <View>
      <Text>Modal Picker</Text>
    </View>
  );
}
