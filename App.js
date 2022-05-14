import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MenuView from "./views/menu";
import PedidoView from "./views/pedido";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Menu"}>
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
