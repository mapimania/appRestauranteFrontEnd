import { StatusBar } from "expo-status-bar"
import {Button, StyleSheet, Text, View, FlatList} from "react-native"
import { ListItem, List } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";



export default function Odenes({navigation}){
    const DATA = [
        {
          id: '001',
          cliente: 'Juan',
          status:'Preparacion'
        },
        {
          id: '002',
          cliente: 'luis',
          status: 'entregado'
        },
        {
          id: '003',
          cliente: 'Maria',
          status:'preparacion'
        },
    ];
    return(
        <View>
            <Button title="Nueva Orden" onPress={() => navigation.navigate("Orden")} />
                <FlatList
                    data={DATA}
                    renderItem={({item}) => (
                        <ListItem
                            title={item.cliente}
                            secondaryText={item.status}
                            onPress={() => navigation.navigate("Menu")}
                        />
                            
                        

                    )}
                />
        </View>
    );
}