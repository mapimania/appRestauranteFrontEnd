import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, ScrollView, BackHandler } from 'react-native';
import { Dialog, SearchBar } from 'react-native-elements';
import { AppContext } from '../../context/userContext';
import ChargueDetailRow from './chargueDetailRow';
import { useIsFocused } from '@react-navigation/native';

const ChargueDetail = ({ navigation, route }) => {
  const {
    charguesDetailVer,
    getingChargues,
    showAlertOk,
    setCurrentDetail,
    currentLoad,
  } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [filteredDetails, setFilteredDetails] = useState(charguesDetailVer);
  const isFocused = useIsFocused();
  const searchRef = useRef();

  const updateSearch = (search) => {
    setSearch(search);
  };

  useEffect(() => {
    if (isFocused && !getingChargues) {
      searchRef.current.focus();
    }
  }, [isFocused, getingChargues]);

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        navigation.navigate('List');
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
    setFilteredDetails(charguesDetailVer);
  }, [charguesDetailVer]);

  const handleSearch = () => {
    let newDetails = [...charguesDetailVer].filter((detail) => {
      return detail.PartNum == search || detail.ProdCode == search;
    });
    setFilteredDetails(newDetails);
  };

  useEffect(() => {
    if (search) {
      handleSearch();
    } else {
      setFilteredDetails(charguesDetailVer);
    }
  }, [search]);

  useEffect(() => {
    if (isFocused && !currentLoad) navigation.navigate('List');
  }, [isFocused, currentLoad]);

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
              placeholder='Buscar (Código de barras)'
              onChangeText={updateSearch}
              value={search}
              ref={searchRef}
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
                if (search.length > 0)
                  if (filteredDetails.length === 1) {
                    setCurrentDetail(filteredDetails[0]);
                    setSearch('');
                    navigation.navigate('Count');
                  } else
                    showAlertOk(
                      'Alerta',
                      'No se encuentran lineas con este código de barras'
                    );
              }}
            />
          </View>
          <ScrollView overScrollMode='never'>
            <View>
              {filteredDetails.map((detail, index) => (
                <ChargueDetailRow
                  key={index}
                  detail={detail}
                  navigation={navigation}
                />
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default ChargueDetail;
