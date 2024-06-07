import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fondo from '../../components/Fondo';
import styles from '../../styles/stylesData';
import commonStyles from '../../styles/stylesCommon';
import BASE_URL from '../../config_ip';
import Header from '../../components/Header'

const DatosEvento = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/eventos/66619aaa73eefd646296196e`);
      setData(response.data);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  const handleModify = () => {

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
        <Text style={commonStyles.errorText}>Error al cargar los datos</Text>
        <Button title="Reintentar" onPress={fetchData} />
      </View>
    );
  }

  const formattedDate = format(new Date(data.fecha_evento.$date), "d 'de' MMMM", { locale: es });
  const formattedTime = data.hora_evento.slice(0, 5); // HH:mm format

  return (
    <View style={{ flex: 1 }}>
    <Header titulo="Datos Evento" onBackPress={() => (navigation.goBack())} />
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <View style={styles.imagenContainer}>
            <Image source={{ uri: `${BASE_URL}${data.imagen_url}` }} style={styles.imagen} />
            <View style={stylesX.precioContainer}>
              <Text style={stylesX.precioText}>{`$${data.precio}`}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={stylesX.nombreEstablecimiento}>{data.nombre_evento}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>
              <Icon name="calendar" size={20} color="#000" /> {formattedDate}      <Icon name="clock-o" size={20} color="#000" /> {formattedTime}
            </Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Descripción Evento:</Text>
            <View style={styles.box}>
              <Text style={styles.fieldValue}>{data.descripcion_evento}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const stylesX = StyleSheet.create({
  nombreEstablecimiento: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  precioContainer: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: 'rgba(255, 255, 0, 0.9)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  precioText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default DatosEvento;
