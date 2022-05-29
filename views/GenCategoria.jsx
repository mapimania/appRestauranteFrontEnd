import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, List } from "@react-native-material/core";
import React, { useState } from "react";
import axios from "axios";

export default function Categories() {
  const [nombre, setNombre] = React.useState("Escribe el nombre");
  const [desc, setDesc] = React.useState(null);
  axios
    .post("http://localhost:3000/categorias", {
      nombre: setNombre,
      desc: setDesc,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <View>
      <TextInput
        onChangeText={setNombre}
        value={nombre}
      />
      <TextInput
        onChangeText={setDesc}
        value={desc}
      />
    </View>
  );
}
