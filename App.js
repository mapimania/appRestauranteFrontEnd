import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './src/components/login';
//mis componentes
import OrdenesView from './src/components/Ordenes';
import OrdenView from './src/components/Orden';
import CategoriesView from './src/components/Categories';
import ProductosView from './src/components/Productos';
import DetalleComandasView from './src/components/DetalleComandas';
import { AppProvider } from './src/context/userContext';
import useFonts from './src/hooks/useFonts';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

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
            name='Productos'
            component={ProductosView}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name='DetalleComandas'
            component={DetalleComandasView}
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
        </Drawer.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
