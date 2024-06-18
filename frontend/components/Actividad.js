import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import 'moment/locale/es';

const Actividad = ({ actividad, onPress }) => {
  if (!actividad) {
    return null;
  }

  const fechaActividad = moment(actividad.fecha_actividad.$date).locale('es').format('LL');

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.nombreActividad}>{actividad.nombre_actividad}</Text>
      <Text style={styles.fecha}>{fechaActividad}</Text>
      <Text style={styles.ubicacion}>{actividad.ubicacion}</Text>
    </TouchableOpacity>
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
