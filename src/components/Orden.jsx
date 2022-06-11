import React, { useContext, useState, useRef, useEffect } from "react";
import { View, Image, Alert, KeyboardAvoidingView } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import axios from "axios";
import Appstyles from "../styles/orden.sass";
import LOGO_PIZZA from "../img/LOGO_PIZZA.png";
import { StatusBar } from "expo-status-bar";
import { AppContext } from "../context/userContext";

const OrdenView = ({ navigation }) => {
  const { comanda, setComanda, server, selectedId, cliente, setCliente } =
    useContext(AppContext);
  return (
    <>
      <StatusBar style='light' backgroundColor='#E84E11' />
      <KeyboardAvoidingView style={Appstyles.container} behavior='padding'>
        <View style={Appstyles.logoContainer}>
          <Image
            source={LOGO_PIZZA}
            style={{ ...Appstyles.logo, resizeMode: "contain" }}
          />
        </View>
        <View style={Appstyles.loginTextContainer}>
          <Text style={Appstyles.loginText} h4>
            Generar Orden
          </Text>
        </View>
        <View style={Appstyles.loginForm}>
          <Text style={Appstyles.textlistpr}>
            Numero de comanda:{selectedId}
          </Text>
          <Input
            placeholder='Nombre del cliente'
            placeholderTextColor='#fff'
            autoCorrect={false}
            style={Appstyles.textlist}
            value={cliente}
            onChangeText={(text) => {
              setCliente(text);
               /*let cliente=comanda.map((idComanda, index) => {
                selectedId=idComanda
              });
              setComanda(cliente); 
              axios.put(`${server}/comandas/` + selectedId,{
                cliente: {comanda},
                total: 0,
                fecha: new Date(),
                estado: "inicio",
              });*/
            }}
            //ref={inputUser}
            //onSubmitEditing={() => inputPassword.current.focus()}
          />
        </View>
        <View style={Appstyles.loginForm}>
          <Button
            title='Agregar Productos'
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
            onPress={() => navigation.navigate("Categories")}
          />
        </View>
        <View style={Appstyles.loginForm}>
          <Button
            title='Detalle Orden'
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
            onPress={() => navigation.navigate("DetalleComandas")}
          />
        </View>
        <View style={Appstyles.loginForm}>
          <Button
            title='Generar Cuenta'
            titleStyle={{
              fontWeight: "500",
              color: "black",
            }}
            buttonStyle={{
              backgroundColor: "rgba(36, 173, 11, 0.8)",
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 10,
              paddingVertical: 10,
            }}
            containerStyle={{
              width: "100%",
            }}
            onPress={() => {
              //Alert.alert("l"+selectedId);
              //navigation.navigate("GenCuenta")
            }}
          />
        </View>
        <View style={Appstyles.loginForm}>
          <Button
            title='Regresar'
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
            onPress={() => navigation.navigate("Ordenes")}
          />
        </View>
        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </>
  );
};

export default OrdenView;
