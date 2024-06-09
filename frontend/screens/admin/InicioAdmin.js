import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Text, ActivityIndicator, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Fondo from '../../components/Fondo';
import Establecimiento from '../../components/Establecimiento';
import commonStyles from '../../styles/commonStyles';
import BASE_URL from '../../config_ip';
import Footer from '../../components/Footer';
import { AdminContext } from '../../context/AdminContext';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const InicioAdmin = ({ navigation }) => {
  const { adminId } = useContext(AdminContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: 'Inicio Administrador'
    });
  }, [navigation]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/administrador_establecimiento/${adminId}`);
      setData(response.data);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchData();
    }, [adminId])
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={commonStyles.centered} />;
  }

  if (error) {
    return (
      <View style={commonStyles.centered}>
        <Text style={commonStyles.errorText}>Error al cargar los datos</Text>
        <Button title="Reintentar" onPress={() => {
          setLoading(true);
          fetchData();
        }} />
      </View>
    );
  }

  const handleCreate = () => {
    navigation.navigate('CrearEstablecimiento', { adminId });
  };

  const handleEstablecimientoPress = (id) => {
    navigation.navigate('DatosEstablecimiento', { id, adminId });
  };

  const handleDatosAdmin = () => {
    navigation.navigate('DatosAdministrador', { adminId });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={commonStyles.container}>
        <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
          <Fondo />
        </View>
        <View style={commonStyles.dataContainer}>
          <FlatList
            data={data.establecimientos}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => <Establecimiento id={item} onPress={() => handleEstablecimientoPress(item)} />}
            ListFooterComponent={() => (
              <TouchableOpacity style={commonStyles.saveButton} onPress={handleCreate}>
                <Icon name="plus-circle" size={30} color="#000" />
                <Text style={commonStyles.saveButtonText}>Crear Establecimiento</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <Footer 
        showAddButton={false} 
        onHangoutPressAdmin={() => navigation.navigate('InicioAdmin', { adminId })}
        onProfilePressAdmin={() => navigation.navigate('DatosAdministrador', { adminId })}
      />
    </View>
  );
};

export default InicioAdmin;
