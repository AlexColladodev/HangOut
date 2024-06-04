import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import FondoComun from '../../components/FondoComun';

const TipoAdministrador = () => {
  const [dni, setDni] = useState('');

  const CrearCuenta = () => {
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.logo}>Tipo de Cuenta Administrador</Text>
          </View>
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
        <TouchableOpacity style={styles.botonGuardar} onPress={CrearCuenta}>
            <Text style={styles.botonGuardarTexto}>Crear Cuenta</Text>
        </TouchableOpacity>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', 
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Centra el texto del logo
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  dniLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    fontSize: 16, // Aumenta el tamaño del texto
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  botonGuardar: {
    backgroundColor: 'purple',
    padding: 10,
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  botonGuardarTexto: {
    color: 'white',
    fontSize: 18,
  },
});

export default TipoAdministrador;
