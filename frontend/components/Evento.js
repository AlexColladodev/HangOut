import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es';
import BASE_URL from '../config_ip';

const DEFAULT_IMAGE_URL = `${BASE_URL}/_uploads/photos/default_no_image.png`;

const Evento = ({ id, mostrarEstablecimiento }) => {
  const [evento, setEvento] = useState(null);
  const [establecimiento, setEstablecimiento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchEvento = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/eventos/${id}`);
      const eventData = response.data;

      if (eventData.fecha_evento && eventData.fecha_evento.$date) {
        eventData.fecha_evento = moment(eventData.fecha_evento.$date).format('DD/MM/YYYY');
      }

      setEvento(eventData);
      setLoading(false);
      setError(false);

      if (mostrarEstablecimiento && eventData.id_establecimiento) {
        fetchEstablecimiento(eventData.id_establecimiento);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  const fetchEstablecimiento = async (idEstablecimiento) => {
    try {
      const response = await axios.get(`${BASE_URL}/establecimientos/${idEstablecimiento}`);
      setEstablecimiento(response.data.nombre_establecimiento);
    } catch (error) {
      console.error('Error fetching establecimiento:', error);
    }
  };

  useEffect(() => {
    fetchEvento();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error al cargar los datos del evento</Text>
      </View>
    );
  }

  if (!evento) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se encontraron datos para el evento</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{evento.fecha_evento || 'Fecha no disponible'}</Text>
      </View>
      <Image source={{ uri: `${BASE_URL}${evento.imagen_url}` }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.nombre} numberOfLines={1} ellipsizeMode="tail">{evento.nombre_evento || 'Nombre no disponible'}</Text>
        {mostrarEstablecimiento && establecimiento && (
          <Text style={styles.establecimiento} numberOfLines={1} ellipsizeMode="tail">{establecimiento || 'Establecimiento no disponible'}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 250, 
  },
  dateContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFD700',
    padding: 5,
    borderRadius: 5,
    zIndex: 1
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000', 
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginTop: 20, 
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    width: '100%',
    marginTop: 10,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', 
    width: '100%',
    color: '#000', 
  },
  establecimiento: {
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
    width: '100%',
    color: '#555', 
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default Evento;
