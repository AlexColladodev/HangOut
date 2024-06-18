import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Image, FlatList, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import Fondo from '../../components/Fondo';
import Evento from '../../components/Evento';
import Oferta from '../../components/Oferta';
import Preferencia from '../../components/Preferencia';
import Review from '../../components/Review';
import commonStyles from '../../styles/commonStyles';
import BASE_URL from '../../config_ip';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../../components/Footer';
import establecimientoUserStyles from '../../styles/userStyles';
import { UserContext } from '../../context/UserContext';
import LinearGradient from 'react-native-linear-gradient';

const DatosEstablecimientoUsuario = ({ navigation, route }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ofertas, setOfertas] = useState([]);
  const [activeTab, setActiveTab] = useState('Eventos');
  const { id } = route.params;
  const { userId, token } = useContext(UserContext);

  React.useEffect(() => {
    navigation.setOptions({
      title: 'Establecimiento',
    });
  }, [navigation]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/establecimientos/${id}`);
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

  useEffect(() => {
    const focusListener = navigation.addListener('focus', fetchData);
    return () => {
      navigation.removeListener('focus', fetchData);
    };
  }, [navigation]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={commonStyles.centered} />;
  }

  if (error) {
    return (
      <View style={commonStyles.centered}>
        <Text style={commonStyles.errorText}>Error al cargar los datos</Text>
        <Button title="Reintentar" onPress={fetchData} />
      </View>
    );
  }

  const handleEventoPressUsuario = (id) => {
    navigation.navigate('DatosEventoUsuario', { id });
  };

  const handleCreateReviewPress = () => {
    navigation.navigate('CrearReview', { establecimientoId: id });
  };

  const handleOfertaPressUsuario = (id) => {
    navigation.navigate('DatosOfertaUsuario', { id });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <Image source={{ uri: `${BASE_URL}${data.imagen_url}` }} style={commonStyles.showImage} />
          <Text style={establecimientoUserStyles.nombreEstablecimiento}>{data.nombre_establecimiento}</Text>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Ambiente:</Text>
            {data.ambiente.length > 0 ? (
              <FlatList
                data={data.ambiente}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Preferencia name={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={commonStyles.list}
              />
            ) : (
              <Text style={commonStyles.fieldValue}>N/A</Text>
            )}
          </View>

          <View style={establecimientoUserStyles.tabContainer}>
            <TouchableOpacity
              style={[
                establecimientoUserStyles.tabButton,
                { backgroundColor: activeTab === 'Eventos' ? '#FF6666' : '#FFCCCB' }
              ]}
              onPress={() => setActiveTab('Eventos')}
            >
              <Icon name="calendar" size={20} color="#000" style={establecimientoUserStyles.icon} />
              <Text style={establecimientoUserStyles.tabText}>Eventos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                establecimientoUserStyles.tabButton,
                { backgroundColor: activeTab === 'Ofertas' ? '#6666FF' : '#ADD8E6' }
              ]}
              onPress={() => setActiveTab('Ofertas')}
            >
              <Icon name="percent" size={20} color="#000" style={establecimientoUserStyles.icon} />
              <Text style={establecimientoUserStyles.tabText}>Ofertas</Text>
            </TouchableOpacity>
          </View>

          <View style={commonStyles.sectionContainer}>
            <Text style={commonStyles.sectionLabel}>{activeTab}:</Text>
            {activeTab === 'Eventos' ? (
              <FlatList
                data={data.eventos}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => <Evento id={item} mostrarEstablecimiento={true} onPress={() => handleEventoPressUsuario(item)} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={commonStyles.list}
              />
            ) : (
              <FlatList
                data={data.ofertas}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => <Oferta id={item} onPress={() => handleOfertaPressUsuario(item)} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={commonStyles.list}
              />
            )}
          </View>

          <View style={commonStyles.sectionContainer}>
            <View style={commonStyles.reviewHeader}>
              <Text style={commonStyles.sectionLabel}>Reviews:</Text>
              <TouchableOpacity style={commonStyles.createReviewButton} onPress={handleCreateReviewPress}>
                <Icon name="plus" size={20} color="black" />
                <Text style={commonStyles.createReviewButtonText}>Crear Review</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={data.reviews}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <Review id={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={commonStyles.list}
            />
          </View>
        </View>
      </ScrollView>
      <Footer
        showAddButton={true}
        onHangoutPressUser={() => navigation.navigate('InicioUsuario', { userId })}
        onProfilePressUser={() => navigation.navigate('DatosUsuario', { userId })}
        onCreateActivity={() => navigation.navigate('CrearActividad', { userId })}
      />
    </View>
  );
};


export default DatosEstablecimientoUsuario;
