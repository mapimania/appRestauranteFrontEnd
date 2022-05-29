import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MenuView from "./views/menu";
import PedidoView from "./views/pedido";
import OrdenesView from "./views/Ordenes";
import OrdenView from "./views/Orden";
import CategoriesView from "./views/Categories";
import ProductosView from "./views/Productos";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Ordenes"}>
        <Stack.Screen
          name="Menu"
          component={MenuView}
          options={{ title: "Menu Section" }}
        />
        <Stack.Screen
          name="Pedido"
          component={PedidoView}
          options={{ title: "Pedido Section" }}
        />
        <Stack.Screen
          name="Ordenes"
          component={OrdenesView}
          options={{ title: "Menu principal" }}
        />
         <Stack.Screen
          name="Orden"
          component={OrdenView}
          options={{ title: "Orden Section" }}
        />
        <Stack.Screen
          name="Productos"
          component={ProductosView}
          options={{ title: "Productos Section" }}
        />
        <Stack.Screen
          name="Categories"
          component={CategoriesView}
          options={{ title: "Elige la categoria" }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
