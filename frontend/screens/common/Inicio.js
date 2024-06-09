import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FondoInicio from '../../components/FondoInicio'; 
import BASE_URL from '../../config_ip';


const Inicio = ({ navigation }) => {

  React.useEffect(() => {
    navigation.setOptions({
      title: 'HangOut'
    });
  }, [navigation]);

  
  return (
    <View style={styles.container}>
      <FondoInicio />
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/HangOutLogo.png')} style={styles.logo} />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonBox}>
          <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('RegistrarseComun')}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('InicioSesion')}>
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
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 125,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    alignSelf: 'stretch',
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
    padding: 20,
  },
});

export default Inicio;
