import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es';
import BASE_URL from '../config_ip';

const Actividad = ({ actividadId }) => {
  const [actividad, setActividad] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/actividades/${actividadId}`);
        setActividad(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [actividadId]);

  if (!actividad) {
    return <Text>Loading...</Text>;
  }

  const fechaActividad = moment(actividad.fecha_actividad.$date).locale('es').format('LL');

  return (
    <View style={styles.container}>
      <Text style={styles.nombreActividad}>{actividad.nombre_actividad}</Text>
      <Text style={styles.fecha}>{fechaActividad}</Text>
      <Text style={styles.ubicacion}>{actividad.ubicacion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
    margin: 10,
  },
  nombreActividad: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fecha: {
    fontSize: 20,
    marginBottom: 10,
  },
  ubicacion: {
    fontSize: 20,
  },
});

export default Actividad;
