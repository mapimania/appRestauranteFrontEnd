import { StatusBar } from "expo-status-bar"
import {Button, StyleSheet, Text, View, FlatList} from "react-native"
import { ListItem, List } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


//this.state = {idCategoria:setState.idCategoria}; recibiendo el id de categories

export default function Productos({}){
    const DATA = [
        {
          id: '001',
          name: 'Pizza Hawaiana',
          Ingre:'Jamon, piña, queso y salsa pomodoro'
        },
        {
            id: '002',
            name: 'Pizza Mexicana',
            Ingre:'Queso, chorizo, carne de res Y cebolla'
        },
        {
            id: '003',
            name: 'Pizza Especial',
            Ingre:'Queso, salami, peperoni, campiñones Y jamon'
        },

    ];
    return(
        <View>
            <FlatList
                data={DATA}
                renderItem={({item}) => (
                    <ListItem
                        title={item.name}
                        secondaryText={item.Ingre}
                    />
                )}
            />
        </View>
    );
}