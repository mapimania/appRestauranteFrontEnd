import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, FlatList} from "react-native";
import { ListItem, List } from "@react-native-material/core";
import React,{ useState } from "react";
import axios from "axios";

export default function Categories({ navigation }) {
  const [state,setState]=React.useState(null);
  React.useEffect(()=>{
    axios.get("http://localhost:3000/categorias").then(function(response){
      console.log(response.data);
      setState(response.data);
    }).catch(function (error){
      console.log(error);
    })
  },[]);

  return (
    <View>
      {<FlatList
        data={state}
        renderItem={({ item }) => (
          <ListItem
            title={item.nombre}
            secondaryText={item.descripcion}
            onPress={() => navigation.navigate("Productos", {idCategoria:setState.idCategoria})}
          />
        )}
      />}
    </View>
  );
}
