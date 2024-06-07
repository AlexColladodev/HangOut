import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, Text, Alert, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Fondo from '../../components/Fondo';
import styles from '../../styles/stylesCreate';
import commonStyles from '../../styles/stylesCommon';
import BASE_URL from '../../config_ip';
import Header from '../../components/Header'
import Footer from '../../components/Footer';

const CrearOferta = () => {
  const [nombreOferta, setNombreOferta] = useState('');
  const [descripcionOferta, setDescripcionOferta] = useState('');
  const [precioOferta, setPrecioOferta] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const idEstablecimiento = '666197975ccba976dcffb41e';

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
    data.append('id_establecimiento', idEstablecimiento);

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
      } else {
        Alert.alert('Error', 'Hubo un problema al crear la oferta');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <View style={{ flex: 1 }}>
    <Header titulo="Crear Oferta" onBackPress={() => (navigation.goBack())} />
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Nombre Oferta:"
              value={nombreOferta}
              onChangeText={setNombreOferta}
              style={styles.input}
            />
            <TextInput
              placeholder="Descripción Oferta:"
              value={descripcionOferta}
              onChangeText={setDescripcionOferta}
              style={styles.input}
            />
            <TextInput
              placeholder="Precio Oferta:"
              value={precioOferta}
              onChangeText={text => setPrecioOferta(text.replace(/[^0-9.]/g, ''))}
              style={styles.input}
              keyboardType="numeric"
            />
            <Button title="Seleccionar Imagen Oferta" onPress={selectImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
          </View>
          <TouchableOpacity style={styles.boton} onPress={handleSave}>
            <Text style={styles.botonTexto}>Guardar</Text>
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

export default CrearOferta;
