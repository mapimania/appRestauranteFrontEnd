import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AppContext } from '../context/userContext';

const CustomSidebarMenu = (props) => {
  const { handleLogout } = useContext(AppContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label='Cerrar Sesión'
          onPress={() => {
            handleLogout();
            props.navigation.navigate('Login');
          }}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default CustomSidebarMenu;
