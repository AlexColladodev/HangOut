import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import Fondo from '../../components/Fondo';
import styles from '../../styles/stylesTipoAdmin';
import commonStyles from '../../styles/stylesCommon';
import Header from '../../components/Header'

const TipoAdministrador = () => {
  const [dni, setDni] = useState('');

  const CrearCuenta = () => {
  };

  return (
    <View style={{ flex: 1 }}>
    <Header titulo="Registro Administrador" onBackPress={() => (navigation.goBack())} />
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.dniLabel}>DNI:</Text>
            <TextInput 
              style={styles.input}
              placeholder="Ingrese su DNI"
              value={dni}
              onChangeText={setDni}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.boton} onPress={CrearCuenta}>
            <Text style={styles.botonTexto}>Crear Cuenta</Text>
        </TouchableOpacity>
        </ScrollView>
    </View>
  );
};



export default TipoAdministrador;
