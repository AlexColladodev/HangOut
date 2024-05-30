import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Button, Image, Dimensions } from 'react-native';
import axios from 'axios';
import FondoComun from '../../components/FondoComun';

const DatosEstablecimiento = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.133.133.241:5000/establecimientos/6658a62cc51f1596f5e940b7');
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
    // Implement save functionality if needed
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
          <Text style={styles.label}>Datos del Establecimiento</Text>
          <Image source={{ uri: data.imagen_url }} style={styles.profileImage} />
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>CIF:</Text>
            <Text style={styles.fieldValue}>{data.cif}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre del Establecimiento:</Text>
            <Text style={styles.fieldValue}>{data.nombre_establecimiento}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>ID Administrador:</Text>
            <Text style={styles.fieldValue}>{data.id_administrador}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Ambiente:</Text>
            {data.ambiente.length > 0 ? (
              data.ambiente.map((item, index) => (
                <Text key={index} style={styles.listItem}>{item}</Text>
              ))
            ) : (
              <Text style={styles.fieldValue}>No hay ambientes disponibles</Text>
            )}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Ofertas:</Text>
            {data.ofertas.length > 0 ? (
              data.ofertas.map((oferta, index) => (
                <Text key={index} style={styles.listItem}>{oferta}</Text>
              ))
            ) : (
              <Text style={styles.fieldValue}>No hay ofertas disponibles</Text>
            )}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Eventos:</Text>
            {data.eventos.length > 0 ? (
              data.eventos.map((evento, index) => (
                <Text key={index} style={styles.listItem}>{evento}</Text>
              ))
            ) : (
              <Text style={styles.fieldValue}>No hay eventos disponibles</Text>
            )}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Reviews:</Text>
            {data.reviews.length > 0 ? (
              data.reviews.map((review, index) => (
                <Text key={index} style={styles.listItem}>{review}</Text>
              ))
            ) : (
              <Text style={styles.fieldValue}>No hay reviews disponibles</Text>
            )}
          </View>

          <Button title="Modificar" color="#BB6BD9" onPress={handleSave} />
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
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  dataContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: Dimensions.get('window').width - 40, // Adjust width according to screen width and padding
    height: 200,
    borderRadius: 10,
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
  sectionContainer: {
    marginBottom: 20,
    width: '100%',
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  listItem: {
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 5,
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

export default DatosEstablecimiento;
