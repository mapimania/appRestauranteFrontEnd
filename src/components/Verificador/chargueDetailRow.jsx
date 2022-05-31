import React, { useContext } from 'react';
import { View, Pressable, Text } from 'react-native';
import { AppContext } from '../../context/userContext';
import Appstyles from '../../styles/charguesList.sass';

const ChargueDetailRow = ({ navigation, detail }) => {
  const { setCurrentDetail } = useContext(AppContext);

  return (
    <Pressable
      onPress={() => {
        setCurrentDetail(detail);
        navigation.navigate('Count');
      }}
      style={({ pressed }) => [
        Appstyles.nosurtida,
        {
          backgroundColor: pressed ? '#dddddd' : 'rgb(255, 255, 255)',
        },
      ]}
    >
      <View>
        <Text style={Appstyles.rowTitle}>SKU:</Text>
        <Text style={Appstyles.rowDetail}>{detail.PartNum}</Text>
        <Text style={Appstyles.rowTitle}>Descripción:</Text>
        <Text style={Appstyles.rowDetail}>{detail.LineDesc}</Text>
      </View>
    </Pressable>
  );
};

export default ChargueDetailRow;
