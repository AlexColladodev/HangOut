import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Button } from 'react-native';
import axios from 'axios';
import FondoComun from '../../components/FondoComun';

const DatosActividad = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.133.133.241:5000/actividades/662f4ac4102ab5737049a6a7');
      setData(response.data);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  const handleSave = () => {
    // Handle save functionality
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error al cargar los datos</Text>
        <Button title="Reintentar" onPress={fetchData} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <FondoComun />
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Datos Actividad</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre Actividad:</Text>
            <Text style={styles.fieldValue}>{data.nombre_actividad}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Descripción Actividad:</Text>
            <Text style={styles.fieldValue}>{data.descripcion_actividad}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Fecha Actividad:</Text>
            <Text style={styles.fieldValue}>{data.fecha_actividad}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Hora Actividad:</Text>
            <Text style={styles.fieldValue}>{data.hora_actividad}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Ubicación:</Text>
            <Text style={styles.fieldValue}>{data.ubicacion}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Participantes:</Text>
            <Text style={styles.fieldValue}>{data.participantes.join(', ')}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Modificar" color="#BB6BD9" onPress={handleSave} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    dataContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    fieldContainer: {
        marginBottom: 10,
        alignItems: 'flex-start',
        width: '100%',
    },
    fieldLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    fieldValue: {
        fontSize: 18,
        marginLeft: 10,
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        marginBottom: 10,
    }
});

export default DatosActividad;
