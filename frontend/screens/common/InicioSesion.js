import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import FondoInicio from '../../components/FondoInicio';

const InicioSesion = ({ navigation }) => {

  React.useEffect(() => {
    navigation.setOptions({
      title: 'Iniciar Sesión'
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FondoInicio />
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/HangOutLogo.png')} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.buttonBox}>
          <TextInput 
            style={styles.input}
            placeholder="Nombre Usuario"
            placeholderTextColor="#000"
          />
          <TextInput 
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#000"
            secureTextEntry
          />
          <TouchableOpacity style={styles.button}>
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
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 1,
    alignItems: 'center',
    width: '100%',
  },
  buttonBox: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 125,
    alignItems: 'center', 
  },
  input: {
    height: 50,
    width: 300,
    backgroundColor: '#FFF',
    margin: 10,
    borderRadius: 10,
    paddingLeft: 10,
    color: '#000',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#8F99FF',
    padding: 15,
    margin: 20,
    width: 175,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4, 
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  buttonText: { 
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    padding: 5
  },
});

export default InicioSesion;
