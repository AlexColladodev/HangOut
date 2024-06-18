import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Button, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fondo from '../../components/Fondo';
import commonStyles from '../../styles/commonStyles';
import BASE_URL from '../../config_ip';
import Footer from '../../components/Footer';
import { UserContext } from '../../context/UserContext';
import userStyles from '../../styles/userStyles';
import moneyImage from '../../assets/money.png';

const DatosEvento = ({ navigation, route }) => {
  const [data, setData] = useState(null);
  const [establecimiento, setEstablecimiento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = route.params;
  const { userId, token } = useContext(UserContext);

  React.useEffect(() => {
    navigation.setOptions({
      title: 'Evento',
    });
  }, [navigation]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/eventos/${id}`);
      setData(response.data);
      setLoading(false);
      setError(false);

      const establecimientoResponse = await axios.get(`${BASE_URL}/establecimientos/${response.data.id_establecimiento}`);
      setEstablecimiento(establecimientoResponse.data);
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

  const formattedDate = format(new Date(data.fecha_evento.$date), "d 'de' MMMM", { locale: es });
  const formattedTime = data.hora_evento.slice(0, 5);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <View style={commonStyles.imageContainer}>
            <Image source={{ uri: `${BASE_URL}${data.imagen_url}` }} style={commonStyles.showImage} />
            <View style={userStyles.priceContainer}>
              <Image source={moneyImage} style={userStyles.moneyImage} />
              <Text style={userStyles.priceText}>{`€ ${data.precio}`}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={userStyles.nombreEstablecimiento}>{data.nombre_evento}</Text>
            {establecimiento && (
              <Text style={[userStyles.nombreEstablecimiento, { fontSize: 18, fontWeight: 'bold' }]}>
                {establecimiento.nombre_establecimiento}
              </Text>
            )}
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>
              <Icon name="calendar" size={20} color="#000" /> {formattedDate} <Icon name="clock-o" size={20} color="#000" /> {formattedTime}
            </Text>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Descripción Evento:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{data.descripcion_evento}</Text>
            </View>
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

export default DatosEvento;
