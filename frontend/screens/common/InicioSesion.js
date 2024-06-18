import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, Alert } from 'react-native';
import FondoInicio from '../../components/FondoInicio';
import axios from 'axios';
import BASE_URL from '../../config_ip';
import { AdminContext } from '../../context/AdminContext';
import { UserContext } from '../../context/UserContext';
import inicioStyles from '../../styles/inicioStyles';

const InicioSesion = ({ navigation }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const { setAdminId, setToken: setAdminToken } = useContext(AdminContext);
  const { setUserId, setToken: setUserToken } = useContext(UserContext);

  React.useEffect(() => {
    navigation.setOptions({
      title: 'Iniciar Sesión'
    });
  }, [navigation]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        nombre_usuario: nombreUsuario,
        password: password
      });
      const data = response.data;

      if (data.acceso) {
        const { token, rol } = data;

        if (rol === 'usuario_generico') {
          const userId = String(data.usuario_generico._id);
          setUserId(userId);
          setUserToken(token);
          navigation.navigate('UsuarioStack');
        } else if (rol === 'administrador_establecimiento') {
          const adminId = String(data.administrador_establecimiento._id);
          setAdminId(adminId);
          setAdminToken(token);
          navigation.navigate('AdminStack');
        }
      } else {
        Alert.alert('Error', 'Acceso denegado');
      }
    } catch (error) {
      Alert.alert('Error', 'Nombre de usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={inicioStyles.container}>
      <FondoInicio />
      <View style={inicioStyles.logoContainer}>
        <Image source={require('../../assets/HangOutLogo.png')} style={inicioStyles.logo} />
      </View>
      <View style={inicioStyles.inputContainer}>
        <View style={inicioStyles.buttonBoxInicioSesion}>
          <TextInput
            style={inicioStyles.input}
            placeholder="Nombre Usuario"
            placeholderTextColor="#000"
            onChangeText={setNombreUsuario}
            value={nombreUsuario}
          />
          <TextInput
            style={inicioStyles.input}
            placeholder="Contraseña"
            placeholderTextColor="#000"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity style={inicioStyles.buttonInicioS} onPress={handleLogin}>
            <Text style={inicioStyles.buttonTextInicioSesion}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InicioSesion;
