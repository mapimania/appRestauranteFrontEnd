import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, BackHandler } from 'react-native';
import { Dialog, SearchBar, Text } from 'react-native-elements';
import ChargueRow from './chargueRow';
import { AppContext } from '../../context/userContext';

const CharguesListVer = ({ navigation }) => {
  const {
    charguesVer,
    getingChargues,
    user,
    postInicioVer,
    setCurrentLoad,
    getChargueDetailsVer,
  } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [filteredChargues, setFilteredChargues] = useState(charguesVer);

  const updateSearch = (search) => {
    setSearch(search);
  };

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        navigation.toggleDrawer();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setFilteredChargues(charguesVer);
  }, [charguesVer]);

  const handleSearch = () => {
    let newChargues = [...charguesVer].filter((chargue) => {
      return chargue.Carga == search;
    });
    setFilteredChargues(newChargues);
  };

  useEffect(() => {
    if (search) {
      handleSearch();
    } else {
      setFilteredChargues(charguesVer);
    }
  }, [search]);

  return (
    <>
      {getingChargues ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Dialog.Loading />
        </View>
      ) : (
        <>
          <View>
            <SearchBar
              placeholder='Buscar (por carga)'
              onChangeText={updateSearch}
              value={search}
              containerStyle={{
                backgroundColor: '#fff',
                borderTopColor: '#fff',
                borderLeftColor: '#fff',
                borderRightColor: '#fff',
              }}
              inputContainerStyle={{
                backgroundColor: '#fff',
              }}
              inputStyle={{
                backgroundColor: '#fff',
              }}
              onSubmitEditing={() => {
                if (filteredChargues.length === 1 && search.length > 0) {
                  const { Clave_Usuario } = user;
                  const { Idh, Folio, Carga } = filteredChargues[0];
                  setCurrentLoad(filteredChargues[0]);
                  getChargueDetailsVer(Folio, Carga);
                  postInicioVer(Clave_Usuario, Idh);
                  setSearch('');
                  navigation.navigate('VerStack');
                }
              }}
            />
          </View>
          <ScrollView overScrollMode='never'>
            <View>
              {filteredChargues.length > 0 ? (
                filteredChargues.map((chargue, i) => (
                  <ChargueRow
                    navigation={navigation}
                    chargue={chargue}
                    key={i}
                  />
                ))
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '400',
                    color: '#000',
                  }}
                >
                  No hay cargas que mostrar
                </Text>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default CharguesListVer;
