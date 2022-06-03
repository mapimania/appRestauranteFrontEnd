import React, { createContext, useState } from "react";
import axios from "axios";
import { Alert } from "react-native";

export const AppProvider = ({ children }) => {
  const [categoria, setCategoria] = useState(null);
  const [user, setUser] = useState(null);
  const [currentLoad, setCurrentLoad] = useState(null);
  const [currentDetail, setCurrentDetail] = useState(null);
  const [charguesVer, setCharguesVer] = useState([]);
  const [getingChargues, setGetingChargues] = useState(false);
  const [charguesDetailVer, setCharguesDetailVer] = useState([]);

  const server = `http://192.168.100.24`;

  const getCategorias =async () => {
    await axios
      .get("http://192.168.100.24:3000/categorias")
      .then((res) => {
        setCategoria(res.data);
      })
      .catch((err) => {
        showAlertOk('Alerta', 'Error busque al encargado');
      })
  };

  const DATA = [
    {
      id: "001",
      nombre: "Juan",
      descripcion: "Preparacion"
    },
    {
      id: "002",
      nombre: "Joel",
      descripcion: "Entregado"
    },
    {
      id: "003",
      nombre: "Oscar",
      descripcion: "preparacion"
    },
  ];

  
  const getCharguesListVer = async (Folio, Carga) => {
    setGetingChargues(true);
    await axios
      .get(
        `${server}/b_Get_Detalle_Cargas_Verificar.php?folio=${Folio}&carga=${Carga}`
      )
      .then((res) => {
        if (res.data) {
          console.log("llamada b_Get_Detalle_Cargas_Verificar");
          setCharguesDetailVer(res.data[0].cargas_det_ver);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setGetingChargues(false);
      });
  };

  const getChargueDetailsVer = async (Folio, Carga) => {
    setGetingChargues(true);
    await axios
      .get(
        `${server}/b_Get_Detalle_Cargas_Verificar.php?folio=${Folio}&carga=${Carga}`
      )
      .then((res) => {
        if (res.data) {
          console.log("llamada b_Get_Detalle_Cargas_Verificar");
          setCharguesDetailVer(res.data[0].cargas_det_ver);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setGetingChargues(false);
      });
  };

  const showAlertOk = (title, message) =>
    Alert.alert(
      title,
      message,
      [
        {
          text: "Ok",
          style: "default",
        },
      ],
      {
        cancelable: false,
      }
    );

  const handleLogout = () => {
    setCharguesVer([]);
  };

  const postInicioVer = async (Clave_Usuario, Idh) => {
    await axios
      .post(
        `${server}/c_Post_Update_Inicio_Verificar_Carga_Head.php?usuario=${Clave_Usuario}&idh=${Idh}`
      )
      .then((res) => {
        if (res.data) {
          console.log("actualizar inicio de carga");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const initialState = {
    server,
    user,
    setUser,
    currentLoad,
    setCurrentLoad,
    currentDetail,
    setCurrentDetail,
    charguesVer,
    getCharguesListVer,
    getingChargues,
    showAlertOk,
    handleLogout,
    setCharguesVer,
    charguesDetailVer,
    setCharguesDetailVer,
    getChargueDetailsVer,
    categoria,
    getCategorias,
    DATA,
    postInicioVer,
  };

  return (
    <AppContext.Provider value={initialState}>{children}</AppContext.Provider>
  );
};

export const AppContext = createContext({
  server: "",
  user: [],
  setUser: () => {},
  currentLoad: [],
  setCurrentLoad: () => {},
  currentDetail: [],
  setCurrentDetail: () => {},
  charguesVer: [],
  getCharguesListVer: () => {},
  getingChargues: false,
  showAlertOk: () => {},
  handleLogout: () => {},
  setCharguesVer: () => {},
  charguesDetailVer: [],
  setCharguesDetailVer: () => {},
  getChargueDetailsVer: () => {},
  categoria:[],
  getCategorias:()=>{},
  DATA:()=>{},
  postInicioVer: () => {},
});
