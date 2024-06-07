import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, Text } from 'react-native';
import FondoComun from './components/FondoComun';
import DatosActividad from './screens/usuario/DatosActividad'
import DatosUsuario from './screens/usuario/DatosUsuario';
import ModificarOferta from './screens/admin/ModificarOferta';
import ModificarEvento from './screens/admin/ModificarEvento';
import RegistrarseComun from './screens/common/RegistrarseComun'
import CrearEstablecimiento from './screens/admin/CrearEstablecimiento'
import ModificarActividad from './screens/usuario/ModificarActividad'
import DatosAdministrador from './screens/admin/DatosAdministrador'
import CrearReview from './screens/usuario/CrearReview';
import DatosEstablecimiento from './screens/admin/DatosEstablecimiento'
import CrearOferta from './screens/admin/CrearOferta'
import ModificarAdministrador from './screens/admin/ModificarAdministrador';
import ModificarUsuario from './screens/usuario/ModificarUsuario';
import Establecimiento from './components/Establecimiento';
import CrearActividad from './screens/usuario/CrearActividad'
import InicioUsuario from './screens/usuario/InicioUsuario';
import CrearEvento from './screens/admin/CrearEvento';
import Inicio from './screens/common/Inicio'
import InicioSesion from './screens/common/InicioSesion'
import DatosEvento from './screens/admin/DatosEvento';
import DatosOferta from './screens/admin/DatosOferta'
import ModificarEstablecimiento from './screens/admin/ModificarEstablecimiento';
import InicioAdmin from './screens/admin/InicioAdmin';
import Fondo from './components/Fondo';
import DatosEstablecimientoUsuario from './screens/usuario/DatosEstablecimientoUsuario';
import DatosEventoUsuario from './screens/usuario/DatosEventoUsuario';
import Header from './components/Header'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="InicioSesion" component={InicioSesion} />
        <Stack.Screen name="RegistrarseComun" component={RegistrarseComun} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
