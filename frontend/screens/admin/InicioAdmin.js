import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';
import Fondo from '../../components/Fondo';
import Establecimiento from '../../components/Establecimiento';
import commonStyles from '../../styles/stylesCommon';
import styles from '../../styles/stylesData';
import BASE_URL from '../../config_ip';
import Header from '../../components/Header'
import Footer from '../../components/Footer';

const InicioAdmin = ({ adminId = "665b57a06bd71b0279ca3925" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/administrador_establecimiento/${adminId}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [adminId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={commonStyles.centered} />;
  }

  if (error) {
    return (
      <View style={commonStyles.centered}>
        <Text style={commonStyles.errorText}>Error al cargar los datos</Text>
        <Button title="Reintentar" onPress={() => setLoading(true)} />
      </View>
    );
  }

  const handleCreate = () => {

  };

  return (
    <View style={{ flex: 1 }}>
    <Header titulo="Inicio" onBackPress={() => (navigation.goBack())} />
    <View style={commonStyles.container}>
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <FlatList
        data={data.establecimientos}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <Establecimiento id={item} />}
        ListFooterComponent={() => (
          <TouchableOpacity style={styles.boton} onPress={handleCreate}>
            <Text style={styles.botonTexto}>Crear Establecimiento</Text>
          </TouchableOpacity>
        )}
      />
    </View>
    <Footer 
        onHangoutPress={() => console.log('Hangout Pressed')} 
        onAddPress={() => console.log('Add Pressed')} 
        onProfilePress={() => console.log('Profile Pressed')} 
        showAddButton={false} 
      />
    </View>
  );
};

export default InicioAdmin;
