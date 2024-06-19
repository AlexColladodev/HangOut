import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, FlatList, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import Fondo from '../../components/Fondo';
import Establecimiento from '../../components/Establecimiento';
import Evento from '../../components/Evento';
import Actividad from '../../components/Actividad';
import ambientes from '../../components/Ambientes';
import commonStyles from '../../styles/commonStyles';
import BASE_URL from '../../config_ip';
import Footer from '../../components/Footer';
import { UserContext } from '../../context/UserContext';
import ambienteStyles from '../../styles/ambienteStyles';
import { useFocusEffect } from '@react-navigation/native';

const InicioUsuario = ({ navigation, route }) => {
  const [preferenciaEstablecimientos, setPreferenciaEstablecimientos] = useState([]);
  const [establecimientos, setEstablecimientos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [filteredEstablecimientos, setFilteredEstablecimientos] = useState([]);
  const [selectedAmbientes, setSelectedAmbientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId, token } = useContext(UserContext);

  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [token]);

  useEffect(() => {
    navigation.setOptions({
      title: 'Inicio'
    });
  }, [navigation]);

  const fetchPreferenciaEstablecimientos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/establecimientos/filtro_personalizado`);
      setPreferenciaEstablecimientos(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchEstablecimientos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/establecimientos/ordenados`);
      setEstablecimientos(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchEventos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/eventos/ordenados`);
      setEventos(response.data.eventos_ordenados);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchActividades = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/actividades/participa/${userId}`);
      setActividades(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([fetchPreferenciaEstablecimientos(), fetchEstablecimientos(), fetchEventos(), fetchActividades()]);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId, fetchData]);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.refresh) {
        fetchData();
      }
    }, [fetchData, route.params])
  );

  const handleSelectAmbiente = async (index) => {
    let updatedSelectedAmbientes = [...selectedAmbientes];
    if (updatedSelectedAmbientes.includes(index)) {
      updatedSelectedAmbientes = updatedSelectedAmbientes.filter(i => i !== index);
    } else {
      updatedSelectedAmbientes.push(index);
    }
    setSelectedAmbientes(updatedSelectedAmbientes);

    const selectedAmbienteNames = updatedSelectedAmbientes.map(i => ambientes[i].name);

    let url = `${BASE_URL}/establecimientos/filtrar`;
    if (selectedAmbienteNames.length > 0) {
      const queryString = selectedAmbienteNames.map(amb => `ambiente=${encodeURIComponent(amb)}`).join('&');
      url += `?${queryString}`;
    }

    try {
      const response = await axios.get(url);
      setFilteredEstablecimientos(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={commonStyles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const handleEstablecimientoPress = (id) => {
    navigation.navigate('DatosEstablecimientoUsuario', { id });
  };

  const handleActividadPress = (actividad) => {
    navigation.navigate('DatosActividad', { actividad });
  };

  const handleEventoPressUsuario = (id) => {
    navigation.navigate('DatosEventoUsuario', { id });
  };

  const renderEstablecimiento = ({ item }) => {
    const [data, rating, numReviews] = item;
    return (
      <Establecimiento
        data={data}
        rating={rating}
        numReviews={numReviews}
        onPress={() => handleEstablecimientoPress(data._id.$oid)}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <Text style={commonStyles.label}>Establecimientos basados en tus preferencias</Text>
          <View style={commonStyles.horizontalListContainer}>
            <FlatList
              data={preferenciaEstablecimientos}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderEstablecimiento}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <Text style={commonStyles.label}>Mejores Establecimientos</Text>
          <View style={commonStyles.horizontalListContainer}>
            <FlatList
              data={establecimientos}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderEstablecimiento}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <Text style={commonStyles.label}>Ambientes</Text>
          <View style={commonStyles.horizontalListContainer}>
            <FlatList
              data={ambientes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={ambienteStyles.tagWrapperUser}>
                  <TouchableOpacity
                    style={[
                      ambienteStyles.tagUser,
                      selectedAmbientes.includes(index) ? ambienteStyles.tagSelectedUser : null,
                    ]}
                    onPress={() => handleSelectAmbiente(index)}
                  >
                    <Image source={item.image} style={ambienteStyles.tagImageUser} />
                  </TouchableOpacity>
                  <Text style={ambienteStyles.tagTextUser}>{item.name}</Text>
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={commonStyles.horizontalListContainer}>
            <FlatList
              data={filteredEstablecimientos}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderEstablecimiento}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <Text style={commonStyles.labelUser}>Eventos próximos</Text>
          <View style={commonStyles.horizontalListContainer}>
            <FlatList
              data={eventos}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <Evento id={item} mostrarEstablecimiento={true} onPress={() => handleEventoPressUsuario(item)} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={commonStyles.list}
            />
          </View>

          <Text style={commonStyles.labelUser}>Tus próximas actividades:</Text>
          <View style={commonStyles.sectionContainer}>
            <FlatList
              data={actividades}
              keyExtractor={(item) => item._id.$oid}
              renderItem={({ item }) => <Actividad actividad={item} onPress={() => handleActividadPress(item)} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={commonStyles.list}
            />
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

export default InicioUsuario;
