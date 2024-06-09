import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Button, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';
import Fondo from '../../components/Fondo';
import commonStyles from '../../styles/commonStyles';
import BASE_URL from '../../config_ip';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { AdminContext } from '../../context/AdminContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const DatosEvento = ({ navigation, route }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = route.params;
  const { adminId } = useContext(AdminContext);

  React.useEffect(() => {
    navigation.setOptions({
      title: 'Evento',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('ModificarEvento', { data })}>
          <Icon name="edit" size={25} color="black" style={{ marginRight: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, data]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/eventos/${id}`);
      setData(response.data);
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

  const formattedDate = new Date(data.fecha_evento.$date).toLocaleDateString();
  const formattedTime = data.hora_evento;

  const handleDelete = () => {
    
    let id_establecimiento = data.id_establecimiento

    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este establecimiento?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            axios.delete(`${BASE_URL}/eventos/${id}`)
              .then(response => {
                Alert.alert('Éxito', 'Evento eliminado correctamente');
                navigation.navigate('DatosEstablecimiento', { id: id_establecimiento });
              })
              .catch(error => {
                console.error(error);
                Alert.alert('Error', 'No se pudo eliminar el evento');
              });
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <View style={commonStyles.imageContainer}>
            <Image source={{ uri: `${BASE_URL}${data.imagen_url}` }} style={commonStyles.showImage} />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Nombre Evento:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{data.nombre_evento}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Descripción Evento:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{data.descripcion_evento}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Fecha Evento:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{formattedDate}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Hora Evento:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{formattedTime}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Precio Evento:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{data.precio} €</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={commonStyles.deleteButton} onPress={handleDelete}>
          <Icon name="trash" size={35} color="red" />
          <Text style={commonStyles.deleteButtonText}>Eliminar Evento</Text>
        </TouchableOpacity>  
      </ScrollView>
      <Footer 
        showAddButton={false} 
        onHangoutPressAdmin={() => navigation.navigate('InicioAdmin', { adminId })}
        onProfilePressAdmin={() => navigation.navigate('DatosAdministrador', { adminId })}
      />
    </View>
  );
};

export default DatosEvento;
