import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Button, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Fondo from '../../components/Fondo';
import Evento from '../../components/Evento'; 
import Review from '../../components/Review'; 
import Oferta from '../../components/Oferta'; 
import styles from '../../styles/stylesData';
import Preferencia from '../../components/Preferencia';
import commonStyles from '../../styles/stylesCommon'
import BASE_URL from '../../config_ip';
import Header from '../../components/Header'
import Footer from '../../components/Footer';

const DatosEstablecimiento = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ofertas, setOfertas] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/establecimientos/666197975ccba976dcffb41e`);
      const establecimientoData = response.data;

      const ofertaPromises = establecimientoData.ofertas.map(async (ofertaId) => {
        const ofertaResponse = await axios.get(`${BASE_URL}/ofertas/${ofertaId}`);
        return ofertaResponse.data;
      });

      const ofertaData = await Promise.all(ofertaPromises);

      setData(establecimientoData);
      setOfertas(ofertaData);
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

  return (
    <View style={{ flex: 1 }}>
    <Header titulo="Datos Establecimiento" onBackPress={() => (navigation.goBack())} />
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
          <View style={commonStyles.dataContainer}>
          <View style={styles.imagenContainer}>
            <Image source={{ uri: `${BASE_URL}${data.imagen_url}` }} style={styles.imagen} />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>CIF:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.cif}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre del Establecimiento:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.nombre_establecimiento}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Ambiente:</Text>
            {data.ambiente.length > 0 ? (
              <FlatList
                data={data.ambiente}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Preferencia name={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.lista}
              />
            ) : (
              <Text style={styles.fieldValue}>N/A</Text>
            )}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Ofertas:</Text>
            <FlatList
              data={data.ofertas}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <Oferta id={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.lista}
            />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Eventos:</Text>
            <FlatList
              data={data.eventos}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <Evento id={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.lista}
            />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Reviews:</Text>
            <FlatList
              data={data.reviews}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <Review reviewId={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.lista}
            />
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

export default DatosEstablecimiento;
