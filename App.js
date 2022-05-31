import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './src/components/login';
import ChargueDetail from './src/components/Verificador/chargueDetail';
import Count from './src/components/Verificador/count';
import CharguesListVer from './src/components/Verificador/charguesListVer';
//mis componentes
import OrdenesView from './src/components/Ordenes';
import OrdenView from './src/components/Orden';
import CategoriesView from './src/components/Categories';
import { AppProvider } from './src/context/userContext';
import useFonts from './src/hooks/useFonts';
import 'react-native-gesture-handler';
import { Image, TouchableOpacity, View } from 'react-native';
import CustomSidebarMenu from './src/components/SidebarMenu';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const VerificadorStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName='Detail'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name='Detail'
        component={ChargueDetail}
        options={{
          title: 'Detalle de carga',
          headerLeft: () => (
            //back button, go back to previous screen
            <TouchableOpacity
              onPress={() => navigation.navigate('List')}
              style={{ paddingLeft: 15 }}
            >
              <Icon name='arrow-back' type='material' color='#FFFFFF' />
            </TouchableOpacity>
          ),
        }}
        
      />
      <Stack.Screen
        name='Count'
        component={Count}
        options={{
          title: 'Conteo de piezas',
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  return (
    <AppProvider>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            activeTintColor: '#e91e63',
          }}
          drawerContent={(props) => <CustomSidebarMenu {...props} />}
          initialRouteName='Ordenes'
        >
          <Drawer.Screen
            name='Ordenes'
            component={OrdenesView}
            options={{
              headerShown: false,
            }}
          />
           <Drawer.Screen
            name='Orden'
            component={OrdenView}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name='Categories'
            component={CategoriesView}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name='Login'
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name='List'
            component={CharguesListVer}
            options={{
              title: 'Lista de cargas verificador',
            }}
          />
          <Drawer.Screen
            name='VerStack'
            component={VerificadorStack}
            options={{
              headerShown: false,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
