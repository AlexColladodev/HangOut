import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import Fondo from '../../components/Fondo';
import axios from 'axios';
import commonStyles from '../../styles/commonStyles';
import inputStyles from '../../styles/inputStyles';
import BASE_URL from '../../config_ip';
import Footer from '../../components/Footer';
import { UserContext } from '../../context/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const SeguirUsuario = ({navigation}) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const { userId, token } = useContext(UserContext);

  React.useEffect(() => {
    navigation.setOptions({
      title: 'Seguir Usuario'
    });
  }, [navigation]);

  const handleSave = async () => {
    const seguirData = {
      nombre_usuario: nombreUsuario,
    };

    try {
      const response = await axios.post(`${BASE_URL}/usuario_generico/seguir_usuario`, seguirData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        Alert.alert('Éxito', 'Usuario seguido con éxito');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Hubo un problema al seguir al usuario');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <View style={inputStyles.inputContainer}>
            <TextInput
              placeholder="Nombre de Usuario"
              value={nombreUsuario}
              onChangeText={setNombreUsuario}
              style={inputStyles.input}
            />
            <TouchableOpacity style={commonStyles.saveButton} onPress={handleSave}>
              <Text style={commonStyles.saveButtonText}>Seguir</Text>
              <Icon name="user-plus" size={30} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Footer 
        showAddButton={true} 
        onHangoutPressUser={() => navigation.navigate('InicioUsuario', { userId })}
        onProfilePressUser={() => navigation.navigate('DatosUsuario', { userId })}
        onCreateActivity={() => navigation.navigate('CrearActividad', { userId })}
      />
    </View>
  );
};

export default SeguirUsuario;
