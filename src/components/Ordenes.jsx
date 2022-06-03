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
import Appstyles from "../styles/ordenes.sass";
import LOGO_PIZZA from "../img/LOGO_PIZZA.png";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import Orden from "../components/Orden";

const OrdenesView = ({ navigation }) => {
  const [state, setState] = useState(null);
  const [comanda, setComanda] = useState(null);
  useEffect(() => {
    axios
      .get("http://192.168.100.24:3000/comandas")
      .then(function (response) {
        setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={Appstyles.textlistprincipal}>
      <Text style={Appstyles.textlistpr}>{item.cliente}</Text>
      <Text style={Appstyles.textlist}>{item.estado}</Text>
    </TouchableOpacity>
  );

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.idComanda);
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
            Herramienta de comandas
          </Text>
        </View>
        <View style={Appstyles.loginForm}>
          <Button
            title="Nueva Comanda"
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
            onPress={() => {
              Alert.alert(
                "¿Deseas crear una nueva comanda?",
                "Esta accion es irreversible",
                [
                  {
                    text: "Si",
                    onPress: () => {
                      setComanda(
                        axios.post("http://192.168.100.24:3000/comandas", {
                          cliente: "Publico general",
                          total: 0,
                          fecha: new Date(),
                          estado: "inicio",
                        })
                      );
                      <Orden comanda={comanda} />;
                      navigation.navigate("Orden");
                    },
                  },
                  {
                    text: "No",
                  },
                ]
              );
            }}
          />
        </View>
        <View style={Appstyles.loginForm}>
          <Text style={Appstyles.nuevoTexto} h4>
            Lista de comandas
          </Text>
          <FlatList
            data={state}
            renderItem={renderItem}
            keyExtractor={(item) => item.idComanda}
            extraData={selectedId}
          />
        </View>
        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </>
  );
};

export default OrdenesView;
