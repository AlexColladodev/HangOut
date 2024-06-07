import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import Fondo from '../../components/Fondo';
import styles from '../../styles/stylesData';
import commonStyles from '../../styles/stylesCommon'
import BASE_URL from '../../config_ip';
import Header from '../../components/Header'
import Footer from '../../components/Footer';

const DatosEvento = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/eventos/66619a1e73eefd646296196c`);
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

  const formattedDate = new Date(data.fecha_evento.$date).toLocaleDateString();
  const formattedTime = data.hora_evento;

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
          <TouchableOpacity style={styles.boton} onPress={handleModify}>
            <Text style={styles.botonTexto}>Modificar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer 
        onHangoutPress={() => console.log('Hangout Pressed')} 
        onAddPress={() => console.log('Add Pressed')} 
        onProfilePress={() => console.log('Profile Pressed')} 
        showAddButton={false} 
      />
    </View>
  );
};

export default DatosEvento;
