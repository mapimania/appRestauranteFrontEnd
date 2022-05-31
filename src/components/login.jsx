import React, { useContext, useState, useRef } from 'react';
import { View, Image, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import axios from 'axios';
import Appstyles from '../styles/login.sass';
import LOGO_TTK from '../img/LOGO_TTK.png';
import { StatusBar } from 'expo-status-bar';
import { AppContext } from '../context/userContext';

const LoginScreen = ({ navigation, route }) => {
  const {
    setUser,
    showAlertOk,
    getCharguesListVer,
    getCharguesListSup,
    server,
  } = useContext(AppContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputUser = useRef(null);
  const inputPassword = useRef(null);

  const login = async () => {
    if (userName !== '' && password !== '') {
      setIsLoading(true);
      await axios
        .post(
          `${server}/getUsuarios_Available.php?clavec=${userName}&pas=${password}`
        )
        .then((res) => {
          setIsLoading(false);
          if (res.data.length > 0) {
            inputUser.current.clear();
            inputPassword.current.clear();
            setUser(res.data[0]);
            switch (res.data[0]?.Descripcion) {
              case 'Verificador':
                getCharguesListVer();
                navigation.navigate('List');
                break;
              case 'Supervisor':
                console.log('carga lista supervisor');
                getCharguesListSup();
                navigation.navigate('ListSup');
                break;
              default:
              //navigation.navigate('Login');
            }
          } else showAlertOk('Alerta', 'Usuario o contraseña incorrectos');
          //navigation.navigate('List');
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <>
      <StatusBar style='light' backgroundColor='#E84E11' />
      <KeyboardAvoidingView style={Appstyles.container} behavior='padding'>
        <View style={Appstyles.logoContainer}>
          <Image
            source={LOGO_TTK}
            style={{ ...Appstyles.logo, resizeMode: 'contain' }}
          />
        </View>
        <View style={Appstyles.loginTextContainer}>
          <Text style={Appstyles.loginText} h4>
            Herramienta de Verificación
          </Text>
        </View>
        <View style={Appstyles.loginForm}>
          <Text style={Appstyles.loginFormText}>Inicio de sesión</Text>
          <Input
            placeholder='Usuario'
            placeholderTextColor='#e84e11af'
            autoCorrect={false}
            onChangeText={(text) => setUserName(text)}
            ref={inputUser}
            onSubmitEditing={() => inputPassword.current.focus()}
          />
          <Input
            placeholder='Contraseña'
            placeholderTextColor='#e84e11af'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            ref={inputPassword}
            onSubmitEditing={login}
          />
          <Button
            title='Continuar'
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
              width: '100%',
            }}
            onPress={() => {
              login();
            }}
          />
        </View>
        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;
