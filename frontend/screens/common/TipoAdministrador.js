import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import FondoComun from '../../components/FondoComun';
import styles from '../../styles/stylesTipoAdmin';
import commonStyles from '../../styles/stylesCommon';

const TipoAdministrador = () => {
  const [dni, setDni] = useState('');

  const CrearCuenta = () => {
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <FondoComun />
        <View style={commonStyles.dataContainer}>
            <Text style={commonStyles.label}>Tipo de Cuenta Administrador</Text>
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
