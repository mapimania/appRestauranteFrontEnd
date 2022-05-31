import React, { useContext, useState, useRef } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import axios from "axios";
import Appstyles from "../styles/ordenes.sass";
import LOGO_TTK from "../img/LOGO_TTK.png";
import { StatusBar } from "expo-status-bar";
import { AppContext } from "../context/userContext";

const OrdenesView = ({ navigation }) => {
  const DATA = [
    {
      id: "001",
      cliente: "Juan",
      status: "Preparacion",
    },
    {
      id: "002",
      cliente: "luis",
      status: "entregado",
    },
    {
      id: "003",
      cliente: "Maria",
      status: "preparacion",
    },
  ];

  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={Appstyles.textlistprincipal}>
      <Text style={Appstyles.textlistpr}>{item.cliente}</Text>
      <Text style={Appstyles.textlist}>{item.status}</Text>
    </TouchableOpacity>
  );

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
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
            Herramienta de comandas
          </Text>
        </View>
        <View style={Appstyles.loginForm}>
          <Button
            title="Nueva Orden"
            titleStyle={{
              fontWeight: "500",
              color: "black",
            }}
            buttonStyle={{
              backgroundColor: "rgba(36, 173, 151, 0.8)",
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
        <View style={Appstyles.loginForm}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </View>
        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </>
  );
};

export default OrdenesView;
