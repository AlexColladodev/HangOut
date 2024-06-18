import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FondoInicio from '../../components/FondoInicio';
import inicioStyles from '../../styles/inicioStyles';

const Inicio = ({ navigation }) => {

  React.useEffect(() => {
    navigation.setOptions({
      title: 'HangOut'
    });
  }, [navigation]);

  return (
    <View style={inicioStyles.container}>
      <FondoInicio />
      <View style={inicioStyles.logoContainer}>
        <Image source={require('../../assets/HangOutLogo.png')} style={inicioStyles.logo} />
      </View>
      <View style={inicioStyles.buttonContainer}>
        <View style={inicioStyles.buttonBox}>
          <TouchableOpacity style={inicioStyles.button1} onPress={() => navigation.navigate('RegistrarseComun')}>
            <Text style={inicioStyles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity style={inicioStyles.button2} onPress={() => navigation.navigate('InicioSesion')}>
            <Text style={inicioStyles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Inicio;
