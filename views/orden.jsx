import { StatusBar } from "expo-status-bar"
import {Button, StyleSheet, Text, View, FlatList} from "react-native"
import { TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";



export default function Orden({navigation}){
    
    return(
        <View>
            <text>Orden Folio: 0003</text>
            <TextInput label="Nombre del cliente" variant="standard" />
            <Button title="Agregar Productos" onPress={() => navigation.navigate("Categories")} />
            <Button title="Detalle Orden" onPress={() => navigation.navigate("detOrden")} />
            <Button title="Generar Cuenta" onPress={() => navigation.navigate("GenCuenta")} />
        </View>
    );
}