import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Modal } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import axios from 'axios';
import Appstyles from '../../styles/count.sass';
import ModalStyles from '../../styles/modal.sass';
import { AppContext } from '../../context/userContext';
import { useIsFocused } from '@react-navigation/native';
import NumberFormat from 'react-number-format';

const Count = ({ navigation, route }) => {
  const {
    currentDetail,
    currentLoad,
    user,
    showAlertOk,
    charguesDetailVer,
    setCharguesDetailVer,
    getCharguesListVer,
    setCurrentLoad,
    server,
  } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
  const [modalComplete, setModalComplete] = useState(false);
  const [count, setCount] = useState('');
  const input = useRef();
  const isFocused = useIsFocused();
  const { Clave_Usuario } = user;
  const { Cantidad_Surtida, Carga, Id, Folio } = currentDetail;

  let loadCopy;

  const handleVerifySku = async () => {
    setIsLoading(true);
    await axios
      .post(
        `${server}/c_Post_Update_Verificar_Carga_Detalle.php?usuario=${Clave_Usuario}&cantidad_verificada=${count}&bandera_diferencia=${
          count != Cantidad_Surtida ? 1 : 0
        }&folio=${Folio}&carga=${Carga}&id_det_carga=${Id}`
      )
      .then((res) => {
        if (res.data) {
          if (res.data[0].codigo === 200) {
            loadCopy = { ...currentLoad };
            let charguesDetailVerCopy = [...charguesDetailVer];
            charguesDetailVerCopy.splice(
              charguesDetailVerCopy.indexOf(currentDetail),
              1
            );
            setCharguesDetailVer(charguesDetailVerCopy);
            setIsLoading(false);
            setModalConfirmVisible(false);
            if (charguesDetailVerCopy.length > 0) {
              setModalSuccessVisible(true);
            } else {
              setModalComplete(true);
            }
          }
          console.log('verificar sku');
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClose = async () => {
    const { Idh } = currentLoad || undefined;
    setIsLoading(true);
    await axios
      .post(
        `${server}/c_Post_Update_Cierre_Verificar_Carga_Head.php?usuario=${Clave_Usuario}&idh=${Idh}`
      )
      .then((res) => {
        if (res.data) {
          if (res.data[0].codigo === 200) {
            console.log('Cerrar carga');
            setModalComplete(false);
            getCharguesListVer();
            setCurrentLoad(undefined);
            //navigation.navigate('List');
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const navigateNextDetail = () => {
    input.current.clear();
    input.current.blur();
    setModalSuccessVisible(false);
    navigation.goBack();
  };

  useEffect(() => {
    if (isFocused && !currentLoad) {
      input.current.clear();
      input.current.blur();
      navigation.goBack();
    } else if (isFocused) input.current.focus();
  }, [isFocused, currentLoad]);

  return (
    <>
      <View style={Appstyles.container}>
        <Text style={Appstyles.info}>{currentDetail?.PartNum}</Text>
        <Text style={Appstyles.info}> {currentDetail?.LineDesc}</Text>
        <Input
          placeholder='Conteo de piezas'
          containerStyle={{
            ...Appstyles.margin,
            width: '90%',
          }}
          label='Conteo de piezas'
          labelStyle={{
            ...Appstyles.label,
          }}
          keyboardType='numeric'
          onChangeText={(text) => setCount(text)}
          ref={input}
          onSubmitEditing={() => {
            try {
              if (!isNaN(parseFloat(count))) {
                setModalConfirmVisible(true);
              } else showAlertOk('Alerta', 'Ingresa un número válido');
            } catch (e) {
              console.log('error', e);
            }
          }}
        />
        <Button
          title='Guardar'
          loadingProps={{
            size: 'small',
            color: 'rgba(0, 0, 0, 1)',
          }}
          titleStyle={{
            fontWeight: '500',
            color: 'black',
          }}
          buttonStyle={{
            backgroundColor: 'rgba(36, 173, 151, 0.8)',
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 10,
          }}
          containerStyle={{
            width: '85%',
          }}
          onPress={() => {
            try {
              if (!isNaN(parseFloat(count))) {
                setModalConfirmVisible(true);
              } else showAlertOk('Alerta', 'Ingresa un número válido');
            } catch (e) {
              console.log('error', e);
            }
          }}
        />
      </View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalConfirmVisible}
        onRequestClose={() => {
          setModalConfirmVisible(!modalConfirmVisible);
        }}
      >
        <View style={ModalStyles.centeredView}>
          <View style={ModalStyles.modalContainer}>
            <NumberFormat
              value={count}
              displayType={'text'}
              thousandSeparator={true}
              renderText={(formattedValue) => (
                <Text style={ModalStyles.modalHeader}>
                  ¿Desea guardar {formattedValue} productos?
                </Text>
              )}
            />
            <Button
              title='Guardar'
              loading={isLoading}
              loadingProps={{
                size: 'small',
                color: 'rgba(0, 0, 0, 1)',
              }}
              titleStyle={{
                fontWeight: '500',
                color: 'black',
              }}
              buttonStyle={{
                backgroundColor: 'rgba(36, 173, 151, 0.8)',
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 10,
                paddingVertical: 10,
              }}
              containerStyle={{
                marginTop: 10,
              }}
              onPress={handleVerifySku}
            />
            <Button
              title='Cancelar'
              titleStyle={{
                fontWeight: '500',
                color: 'black',
              }}
              buttonStyle={{
                backgroundColor: 'rgba(247, 85, 112, 0.8)',
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 10,
                paddingVertical: 10,
              }}
              containerStyle={{
                marginTop: 10,
              }}
              onPress={() => {
                setIsLoading(false);
                setModalConfirmVisible(!modalConfirmVisible);
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalSuccessVisible}
        onRequestClose={() => {}}
      >
        <View style={ModalStyles.centeredView}>
          <View style={ModalStyles.modalContainer}>
            <Text style={ModalStyles.modalHeader}>Guardado Correctamente</Text>

            {charguesDetailVer?.length > 0 && (
              <>
                <Text style={ModalStyles.modalText}>
                  {charguesDetailVer?.length} lineas restantes
                </Text>

                <Button
                  title='Regresar al listado'
                  loading={isLoading}
                  loadingProps={{
                    size: 'small',
                    color: 'rgba(0, 0, 0, 1)',
                  }}
                  titleStyle={{
                    fontWeight: '500',
                    color: 'black',
                  }}
                  buttonStyle={{
                    backgroundColor: 'rgba(36, 173, 151, 0.8)',
                    borderColor: 'black',
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingVertical: 10,
                  }}
                  containerStyle={{
                    marginTop: 10,
                  }}
                  onPress={navigateNextDetail}
                />
              </>
            )}
          </View>
        </View>
      </Modal>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalComplete}
        onRequestClose={() => {}}
      >
        <View style={ModalStyles.centeredView}>
          <View style={ModalStyles.modalContainer}>
            <Text style={ModalStyles.modalHeader}>Carga Completa</Text>
            <Button
              title='Cerrar verificación y Siguiente Carga'
              loading={isLoading}
              loadingProps={{
                size: 'small',
                color: 'rgba(0, 0, 0, 1)',
              }}
              titleStyle={{
                fontWeight: '500',
                color: 'black',
              }}
              buttonStyle={{
                backgroundColor: 'rgba(36, 173, 151, 0.8)',
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 10,
                paddingVertical: 10,
              }}
              containerStyle={{
                marginTop: 10,
              }}
              onPress={handleClose}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Count;
