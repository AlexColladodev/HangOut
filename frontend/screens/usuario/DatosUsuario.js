import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Button, Image } from 'react-native';
import axios from 'axios';
import FondoComun from '../../components/FondoComun';

const DatosUsuario = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.133.133.241:5000/usuario_generico/6655fb6c0de733860fff23dd');
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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <FondoComun />
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Datos Usuario</Text>
          <Image source={require('../../assets/default.png')} style={styles.profileImage} />
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre:</Text>
            <Text style={styles.fieldValue}>{data.nombre}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre Usuario:</Text>
            <Text style={styles.fieldValue}>{data.nombre_usuario}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Correo Electrónico:</Text>
            <Text style={styles.fieldValue}>{data.email}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Teléfono:</Text>
            <Text style={styles.fieldValue}>{data.telefono}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Fecha de Nacimiento:</Text>
            <Text style={styles.fieldValue}>{data.fecha_nac}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Seguidos:</Text>
            <Text style={styles.fieldValue}>{data.seguidos.length > 0 ? data.seguidos.join(', ') : 'N/A'}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Preferencias:</Text>
            <Text style={styles.fieldValue}>{data.preferencias.length > 0 ? data.preferencias.join(', ') : 'N/A'}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Actividades Creadas:</Text>
            <Text style={styles.fieldValue}>{data.actividades_creadas.length > 0 ? data.actividades_creadas.join(', ') : 'N/A'}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Reviews:</Text>
            <Text style={styles.fieldValue}>{data.reviews.length > 0 ? data.reviews.join(', ') : 'N/A'}</Text>
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
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
    marginBottom: 40,
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

export default DatosUsuario;
