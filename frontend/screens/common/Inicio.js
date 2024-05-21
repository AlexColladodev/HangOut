// Inicio.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Fondo from '../../components/Fondo'; // Actualizar la ruta de importación

const Inicio = () => {
  return (
    <View style={styles.container}>
      <Fondo />
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/HangOutLogo.png')} style={styles.logo} />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonBox}>
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  logo: {
    position: 'absolute',
    top: '38%',
    width: 400,
    height: 230,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 1,
  },
  buttonBox: {
    backgroundColor: '#E1C3FF',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 125,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1, // Permite que el componente crezca para ocupar el espacio disponible
    alignSelf: 'stretch', // Estira el componente para ocupar el ancho disponible
  },
  button2: {
    backgroundColor: '#8F99FF',
    padding: 20,
    margin: 20,
    marginTop: 60,
    width: 175,
    height: 100,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4, 
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  button1: {
    backgroundColor: '#B66DFF',
    padding: 20,
    margin: 20,
    width: 175,
    marginTop: 60,
    height: 100,
    borderRadius: 10,
    shadowColor: '#000', 
    shadowOpacity: 0.5, 
    shadowRadius: 4, 
    shadowOffset: { width: 0, height: 4 }, 
    elevation: 6,
  },
  buttonText: { 
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    padding: 20
  },
});

export default Inicio;
