import axios from 'axios';
import React, { useContext } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'react-native-elements';
import { AppContext } from '../../context/userContext';
import Appstyles from '../../styles/charguesList.sass';

const ChargueRow = ({ navigation, chargue }) => {
  const { setCurrentLoad, user, getChargueDetailsVer, postInicioVer } =
    useContext(AppContext);
  const { Idh, Folio, Carga } = chargue;
  const { Clave_Usuario } = user;

  return (
    <Pressable
      onPress={() => {
        setCurrentLoad(chargue);
        getChargueDetailsVer(Folio, Carga);
        postInicioVer(Clave_Usuario, Idh);
        navigation.navigate('VerStack');
      }}
      style={({ pressed }) => [
        Appstyles.nosurtida,
        {
          backgroundColor: pressed ? '#dddddd' : 'rgb(255, 255, 255)',
        },
      ]}
    >
      <View>
        <View style={Appstyles.row}>
          <Text style={Appstyles.rowTitle}>Carga:</Text>
          <Text style={Appstyles.rowSubtitle}>{chargue.Carga}</Text>
        </View>
        <View style={Appstyles.row}>
          <Text style={Appstyles.rowTitle}>Folio:</Text>
          <Text style={Appstyles.rowSubtitle}>{chargue.Folio}</Text>
        </View>
        {chargue.No_Activo != null && (
          <View style={Appstyles.row}>
            <Text style={Appstyles.rowTitle}>Unidad de entrega:</Text>
            <Text style={Appstyles.rowSubtitle}>{chargue.No_Activo}</Text>
          </View>
        )}
        <View style={Appstyles.row}>
          <Text style={Appstyles.rowTitle}>Surtidor:</Text>
          <Text style={Appstyles.rowSubtitle}>{chargue.Surtidor}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChargueRow;
