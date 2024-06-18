import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Button, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Fondo from '../../components/Fondo';
import commonStyles from '../../styles/commonStyles';
import BASE_URL from '../../config_ip';
import Footer from '../../components/Footer';
import { AdminContext } from '../../context/AdminContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const DatosAdministrador = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { adminId, token } = useContext(AdminContext);

  React.useEffect(() => {
    navigation.setOptions({
      title: 'Administrador',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('ModificarAdministrador', { data })}>
          <Icon name="edit" size={25} color="black" style={{ marginRight: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, data]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/administrador_establecimiento/${adminId}`);
      const { administrador } = response.data;
      setData(administrador);
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

  const formattedFechaNac = new Date(data.fecha_nac.$date).toLocaleDateString();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <View style={commonStyles.profileImageContainer}>
            <Image source={{ uri: `${BASE_URL}${data.imagen_url}` }} style={commonStyles.profileImage} />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Nombre:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{data.nombre}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Nombre Usuario:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{data.nombre_usuario}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Correo Electrónico:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{data.email}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Teléfono:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{data.telefono}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Fecha de Nacimiento:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{formattedFechaNac}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer
        showAddButton={false}
        onHangoutPressAdmin={() => navigation.navigate('InicioAdmin', { adminId })}
        onProfilePressAdmin={() => navigation.navigate('DatosAdministrador', { adminId })}
      />
    </View>
  );
};

export default DatosAdministrador;
