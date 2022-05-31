/* import { StatusBar } from "expo-status-bar";
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
} */
import React, { useContext, useState, useRef, FlatList } from "react";
import { View, Image, KeyboardAvoidingView } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import axios from "axios";
import Appstyles from "../styles/login.sass";
import LOGO_TTK from "../img/LOGO_TTK.png";
import { StatusBar } from "expo-status-bar";
import { AppContext } from "../context/userContext";

const CategoriesView = ({ navigation}) => {

  const [state, setState] = React.useState(null);
  React.useEffect(()=>{
    axios.get("http://localhost:3000/categorias").then(function(response){
      console.log(response.data);
      setState(response.data);
    }).catch(function (error){
      console.log(error);
    })
  },[]);

  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={Appstyles.textlistprincipal}>
      <Text style={Appstyles.textlistpr}>{item.nombre}</Text>
      <Text style={Appstyles.textlist}>{item.descripcion}</Text>
    </TouchableOpacity>
  );

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.idCategoria)}
      />
    );
  };

  return (
    <>
      <StatusBar style="light" backgroundColor="#E84E11" />
      <KeyboardAvoidingView style={Appstyles.container} behavior="padding">
        <View style={Appstyles.logoContainer}>
          <Image
            source={LOGO_TTK}
            style={{ ...Appstyles.logo, resizeMode: "contain" }}
          />
        </View>
        <View style={Appstyles.loginTextContainer}>
          <Text style={Appstyles.loginText} h4>
            Herramienta de Verificación
          </Text>
        </View>
        <View style={Appstyles.loginForm}>
          <FlatList
            data={state}
            renderItem={renderItem}
            keyExtractor={(item) => item.idCategoria}
            extraData={selectedId}
          />
        </View>
        <View style={Appstyles.loginForm}>
          <Button
            title="Regresar"
            titleStyle={{
              fontWeight: "500",
              color: "black",
            }}
            buttonStyle={{
              backgroundColor: "rgba(190, 0,0, 0.8)",
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 10,
              paddingVertical: 10,
            }}
            containerStyle={{
              width: "100%",
            }}
            onPress={() => navigation.navigate("Orden")}
          />
        </View>
        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </>
  );
};

export default CategoriesView;
