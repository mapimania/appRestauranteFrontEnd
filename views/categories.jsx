import { StatusBar } from "expo-status-bar"
import {Button, StyleSheet, Text, View, FlatList} from "react-native"
import { ListItem, List } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";



export default function Categories({navigation}){
    const DATA = [
        {
          id: '001',
          categoria: 'Bebidas',
          desc:'Bebidas refrescantes'
        },
        {
            id: '002',
            categoria: 'Entradas',
            desc:'Platos antes del plato fuerte'
        },
        {
            id: '003',
            categoria: 'Platillos',
            desc:'Palatosfuetes'
        },
        {
            id: '004',
            categoria: 'Postres',
            desc:'Platos dulces para terminar'
        },
    ];
    return(
        <View>
            
                <FlatList
                    data={DATA}
                    renderItem={({item}) => (
                        <ListItem
                            title={item.categoria}
                            secondaryText={item.desc}
                            onPress={() => navigation.navigate("Productos")}
                        />
                            
                        

                    )}
                />
        </View>
    );
}