import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, Button } from 'react-native';
import axios from 'axios';
import UsuarioInvitar from '../../components/UsuarioInvitar';
import { UserContext } from '../../context/UserContext';
import commonStyles from '../../styles/commonStyles';
import BASE_URL from '../../config_ip';
import Fondo from '../../components/Fondo';

const CompartirActividad = ({ navigation, route }) => {
  const { userId, token } = useContext(UserContext);
  const [usuariosSeguidos, setUsuariosSeguidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { actividadId } = route.params;

  useEffect(() => {
    const fetchSeguidosYParticipantes = async () => {
      try {
        const usuarioResponse = await axios.get(`${BASE_URL}/usuario_generico/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const actividadResponse = await axios.get(`${BASE_URL}/actividades/${actividadId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const seguidos = usuarioResponse.data.usuario.seguidos;
        const participantes = actividadResponse.data.participantes;

        const seguidosNoParticipantes = seguidos.filter(id => !participantes.includes(id));

        setUsuariosSeguidos(seguidosNoParticipantes);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    };

    fetchSeguidosYParticipantes();
  }, [userId, token, actividadId]);

  const handleInvite = async (seguidoId) => {
    const requestData = {
      id_actividad: actividadId,
      id_usuario: seguidoId
    };

    try {
      const response = await axios.post(`${BASE_URL}/usuario_generico/invita_actividad`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        Alert.alert('Éxito', 'Usuario invitado con éxito');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Hubo un problema al invitar al usuario');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={commonStyles.centered} />;
  }

  if (error) {
    return (
      <View style={commonStyles.centered}>
        <Text style={commonStyles.errorText}>Error al cargar los datos</Text>
        <Button title="Reintentar" onPress={fetchSeguidosYParticipantes} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <FlatList
        data={usuariosSeguidos}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <UsuarioInvitar id={item} onPress={() => handleInvite(item)} />
        )}
      />
    </View>
  );
};

export default CompartirActividad;
