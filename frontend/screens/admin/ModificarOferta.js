import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert, Button, Image } from 'react-native';
import axios from 'axios';
import Fondo from '../../components/Fondo';
import inputStyles from '../../styles/inputStyles';
import commonStyles from '../../styles/commonStyles';
import BASE_URL from '../../config_ip';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { AdminContext } from '../../context/AdminContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const ModificarOferta = ({ navigation, route }) => {
  const { adminId } = useContext(AdminContext);
  const [data, setData] = useState(route.params.data);

  const handleInputChange = (field, value) => {
    setData(prevState => ({ ...prevState, [field]: value }));
  };

  const handleSave = async () => {
    const { nombre_oferta, descripcion_oferta, precio_oferta, _id, id_establecimiento, imagen_url } = data;
    const updatedData = {
      nombre_oferta,
      descripcion_oferta,
      precio_oferta: parseFloat(precio_oferta),
      id_establecimiento,
      imagen_url
    };

    let id = data._id.$oid;

    try {
      const response = await axios.put(`${BASE_URL}/ofertas/${id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        Alert.alert('Éxito', 'Oferta actualizada con éxito');
        navigation.navigate('DatosOferta', { id });
      } else {
        const errorMsg = response.data.error || 'Hubo un problema al actualizar la oferta';
        Alert.alert('Error', errorMsg);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'No se pudo conectar con el servidor';
      Alert.alert('Error', errorMsg);
    }
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
            <Text style={commonStyles.fieldLabel}>Nombre Oferta:</Text>
            <TextInput
              style={inputStyles.input}
              value={data.nombre_oferta}
              onChangeText={(value) => handleInputChange('nombre_oferta', value)}
            />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Descripción Oferta:</Text>
            <TextInput
              style={inputStyles.input}
              value={data.descripcion_oferta}
              onChangeText={(value) => handleInputChange('descripcion_oferta', value)}
            />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Precio Oferta:</Text>
            <TextInput
              style={inputStyles.input}
              value={data.precio_oferta.toString()}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('precio_oferta', value)}
            />
          </View>
          <TouchableOpacity style={commonStyles.saveButton} onPress={handleSave}>
            <Text style={commonStyles.saveButtonText}>Guardar</Text>
            <Icon name="save" size={30} color="#000" />
          </TouchableOpacity>
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

export default ModificarOferta;
