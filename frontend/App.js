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
import { AdminProvider } from './context/AdminContext';

const Stack = createNativeStackNavigator();
const UsuarioStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();

function UsuarioStackScreen() {
  return (
    <UsuarioStack.Navigator>
      <UsuarioStack.Screen name="InicioUsuario" component={InicioUsuario} />
      {/* Agregar otras pantallas para usuarios */}
    </UsuarioStack.Navigator>
  );
}

function AdminStackScreen() {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen name="InicioAdmin" component={InicioAdmin} />
      <AdminStack.Screen name="CrearEstablecimiento" component={CrearEstablecimiento} />
      <AdminStack.Screen name="CrearEvento" component={CrearEvento} />
      <AdminStack.Screen name="CrearOferta" component={CrearOferta} />
      <AdminStack.Screen name="DatosAdministrador" component={DatosAdministrador} />
      <AdminStack.Screen name="DatosEstablecimiento" component={DatosEstablecimiento} />
      <AdminStack.Screen name="DatosEvento" component={DatosEvento} />
      <AdminStack.Screen name="DatosOferta" component={DatosOferta} />
      <AdminStack.Screen name="ModificarAdministrador" component={ModificarAdministrador} />
      <AdminStack.Screen name="ModificarEstablecimiento" component={ModificarEstablecimiento} />
      <AdminStack.Screen name="ModificarEvento" component={ModificarEvento} />
      <AdminStack.Screen name="ModificarOferta" component={ModificarOferta} />
    </AdminStack.Navigator>
  );
}

function App() {
  return (
    <AdminProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio">
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="InicioSesion" component={InicioSesion} />
          <Stack.Screen name="RegistrarseComun" component={RegistrarseComun} />
          <Stack.Screen name="UsuarioStack" component={UsuarioStackScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AdminStack" component={AdminStackScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AdminProvider>
  );
}

export default App;
