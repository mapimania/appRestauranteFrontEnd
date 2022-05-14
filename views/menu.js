import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Menu({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.fixToText}>
        <Button title="Menu" onPress={() => navigation.navigate("Menu")} />
        <Button title="Pedidos" onPress={() => navigation.navigate("Pedido")} />
      </View>
      <View style={{ backgroundColor: "darkorange", marginTop:"20px"}} >
        <Text>Welcome</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  }
});

