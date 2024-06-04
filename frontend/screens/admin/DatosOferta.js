import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import FondoComun from '../../components/FondoComun';
import styles from '../../styles/styles_data';

const DatosOferta = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.133.133.241:5000/ofertas/665e0d32e7479afa974873c2');
      setData(response.data);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  const Modificar = () => {

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
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Datos Oferta</Text>
          <View style={styles.imagenContainer}>
            <Image source={{ uri: data.imagen_url }} style={styles.imagen} />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre Oferta:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.nombre_oferta}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Descripción Oferta:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.descripcion_oferta}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Precio Oferta:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.precio_oferta} €</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.boton} onPress={Modificar}>
            <Text style={styles.botonTexto}>Modificar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default DatosOferta;
