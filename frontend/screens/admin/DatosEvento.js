import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import FondoComun from '../../components/FondoComun';
import styles from '../../styles/styles_data';

const DatosEvento = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.133.133.241:5000/eventos/665e0db67d438e985b7b77b1');
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

  const formattedDate = new Date(data.fecha_evento.$date).toLocaleDateString();
  const formattedTime = data.hora_evento;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Datos Evento</Text>
          <View style={styles.imagenContainer}>
            <Image source={{ uri: data.imagen_url }} style={styles.imagen} />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre Evento:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.nombre_evento}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Descripción Evento:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.descripcion_evento}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Fecha Evento:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{formattedDate}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Hora Evento:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{formattedTime}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Precio Evento:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.precio} €</Text>
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

export default DatosEvento;
