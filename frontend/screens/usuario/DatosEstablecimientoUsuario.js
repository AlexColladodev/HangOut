import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Fondo from '../../components/Fondo';
import Evento from '../../components/Evento'; 
import Oferta from '../../components/Oferta'; 
import styles from '../../styles/stylesData';
import Preferencia from '../../components/Preferencia';
import Review from '../../components/Review';
import commonStyles from '../../styles/stylesCommon';
import BASE_URL from '../../config_ip';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header'
import Footer from '../../components/Footer';

const DatosEstablecimientoUsuario = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ofertas, setOfertas] = useState([]);
  const [activeTab, setActiveTab] = useState('Eventos');

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
    <Header titulo="Establecimiento" onBackPress={() => (navigation.goBack())} />
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <Image source={{ uri: `${BASE_URL}${data.imagen_url}` }} style={styles.imagen} />
          <Text style={stylesX.nombreEstablecimiento}>{data.nombre_establecimiento}</Text>
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

          <View style={stylesX.tabContainer}>
          <TouchableOpacity
            style={[
              stylesX.tabButton, 
              { backgroundColor: activeTab === 'Eventos' ? '#FF6666' : '#FFCCCB' }
            ]}
            onPress={() => setActiveTab('Eventos')}
          >
            <Icon name="calendar" size={20} color="#000" style={stylesX.icon} />
            <Text style={stylesX.tabText}>Eventos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              stylesX.tabButton, 
              { backgroundColor: activeTab === 'Ofertas' ? '#6666FF' : '#ADD8E6' }
            ]}
            onPress={() => setActiveTab('Ofertas')}
          >
            <Icon name="percent" size={20} color="#000" style={stylesX.icon} />
            <Text style={stylesX.tabText}>Ofertas</Text>
          </TouchableOpacity>
        </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>{activeTab}:</Text>
            {activeTab === 'Eventos' ? (
              <FlatList
                data={data.eventos}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => <Evento id={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.lista}
              />
            ) : (
              <FlatList
                data={data.ofertas}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => <Oferta id={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.lista}
              />
            )}
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
        </View>
      </ScrollView>
      <Footer 
        onHangoutPress={() => console.log('Hangout Pressed')} 
        onAddPress={() => console.log('Add Pressed')} 
        onProfilePress={() => console.log('Profile Pressed')} 
        showAddButton={true} 
      />
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 10,
  },
  tabText: {
    marginLeft: 10,
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
});
export default DatosEstablecimientoUsuario;
