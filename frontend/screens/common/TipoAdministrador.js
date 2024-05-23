import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';

// Asegúrate de importar tu componente FondoComun
import FondoComun from '../../components/FondoComun';

const TipoAdministrador = () => {
  const [dni, setDni] = useState('');

  const handleCreateAccount = () => {
    // Lógica para manejar la creación de cuenta
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
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Crear Cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Asegura que el contenedor ocupe todo el ancho
    paddingHorizontal: 20, // Añade un padding horizontal si es necesario
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
    bottom: 20, // Posiciona el botón en la parte inferior con margen
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15, // Aumenta el padding del botón
    borderRadius: 20,
    alignItems: 'center', // Centra el texto del botón
    width: '35%', // Ajusta el ancho del botón
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TipoAdministrador;
