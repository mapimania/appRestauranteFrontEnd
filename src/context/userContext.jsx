import React, { createContext, useState ,useEffect} from "react";
import axios from "axios";
import { Alert } from "react-native";

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const [comanda, setComanda] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [cliente, setCliente] = useState(null);

  //const server = `http://192.168.100.24:3000/`; //casa
  //const server = `http://192.168.0.33:3000/`; //oficina
  const server = `http://192.168.1.111:3000/`; //escuela
  

  const getState=useEffect(() => {
    axios
      .get(`${server}/comandas`)
      .then(function (response) {
        setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [comanda]);
  
  const initialState = {
    server,
    state,
    getState,
    comanda,
    setComanda,
    selectedId,
    setSelectedId,
    cliente,
    setCliente
  };

  return (
    <AppContext.Provider value={initialState}>{children}</AppContext.Provider>
  );
};

export const AppContext = createContext({
  server: "",
  state:[],
  getState:()=>{},
  comanda:[],
  setComanda:()=>{},
  selectedId:[],
  setSelectedId:()=>{},
  cliente:[],
  setCliente:()=>{},
});
