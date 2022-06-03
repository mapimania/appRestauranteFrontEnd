import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button, Text } from "react-native-elements";
import axios from "axios";
import Appstyles from "../styles/productos.sass";
import LOGO_PIZZA from "../img/LOGO_PIZZA.png";
import { StatusBar } from "expo-status-bar";

const ProductosView = ({ navigation }) => {
  const [state, setState] = useState(null);
  useEffect(() => {
    axios
      .get("http://192.168.100.24:3000/productos")
      .then(function (response) {
        setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={Appstyles.textlistprincipal}>
      <Text style={Appstyles.textlistpr}>{item.nombre}</Text>
      <Text style={Appstyles.textlist}>
        ${item.precio}, ingredientes: {item.ingredientes}
      </Text>
    </TouchableOpacity>
  );

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          Alert.alert(
            "Se agregó a la orden el producto: "+item.nombre
          );
          navigation.navigate("Orden");
          setSelectedId(item.idProducto);
        }}
      />
    );
  };

  return (
    <>
      <StatusBar style="light" backgroundColor="#E84E11" />
      <KeyboardAvoidingView style={Appstyles.container} behavior="padding">
        <View style={Appstyles.logoContainer}>
          <Image
            source={LOGO_PIZZA}
            style={{ ...Appstyles.logo, resizeMode: "contain" }}
          />
        </View>
        <View style={Appstyles.loginTextContainer}>
          <Text style={Appstyles.loginText} h4>
            Elige el producto
          </Text>
        </View>
        <View style={Appstyles.loginForm}>
          <FlatList
            data={state}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
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
            onPress={() => navigation.navigate("Categories")}
          />
        </View>
        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </>
  );
};

export default ProductosView;
