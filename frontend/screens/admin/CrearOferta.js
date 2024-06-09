import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, Text, Alert, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Fondo from '../../components/Fondo';
import inputStyles from '../../styles/inputStyles';
import commonStyles from '../../styles/commonStyles';
import BASE_URL from '../../config_ip';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { AdminContext } from '../../context/AdminContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const CrearOferta = ({ navigation, route }) => {
  const [nombreOferta, setNombreOferta] = useState('');
  const [descripcionOferta, setDescripcionOferta] = useState('');
  const [precioOferta, setPrecioOferta] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const { id } = route.params;
  const { adminId } = useContext(AdminContext);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append('nombre_oferta', nombreOferta);
    data.append('descripcion_oferta', descripcionOferta);
    data.append('precio_oferta', precioOferta);
    data.append('id_establecimiento', id);

    if (imageUri) {
      const uriParts = imageUri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      data.append('imagen', {
        uri: imageUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    } else {
      data.append('imagen', null);
    }

    try {
      const response = await axios.post(`${BASE_URL}/establecimientos/nueva_oferta`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Alert.alert('Éxito', 'Oferta creada con éxito');
        setNombreOferta('');
        setDescripcionOferta('');
        setPrecioOferta('');
        setImageUri(null);
        navigation.navigate('DatosEstablecimiento', { id }); 
      } else {
        const errorMsg = response.data.error || 'Hubo un problema al crear la oferta';
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
          <View style={inputStyles.inputContainer}>
            <TextInput
              placeholder="Nombre Oferta:"
              value={nombreOferta}
              onChangeText={setNombreOferta}
              style={inputStyles.input}
            />
            <TextInput
              placeholder="Descripción Oferta:"
              value={descripcionOferta}
              onChangeText={setDescripcionOferta}
              style={inputStyles.input}
            />
            <TextInput
              placeholder="Precio Oferta:"
              value={precioOferta}
              onChangeText={text => setPrecioOferta(text.replace(/[^0-9.]/g, ''))}
              style={inputStyles.input}
              keyboardType="numeric"
            />
            <Button title="Seleccionar Imagen Oferta" onPress={selectImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={commonStyles.image} />}
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

export default CrearOferta;
