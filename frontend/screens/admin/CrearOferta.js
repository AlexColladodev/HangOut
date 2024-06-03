import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, Text, Alert, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import FondoComun from '../../components/FondoComun';

const CrearOferta = () => {
  const [nombreOferta, setNombreOferta] = useState('');
  const [descripcionOferta, setDescripcionOferta] = useState('');
  const [precioOferta, setPrecioOferta] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const idEstablecimiento = '665b5df730fb9962d8d08eea';

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
      const response = await axios.post('http://10.133.133.241:5000/establecimientos/nueva_oferta', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Alert.alert('Éxito', 'Oferta creada con éxito');
        // Resetear los campos después de guardar
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
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <Text style={styles.title}>Crear Oferta</Text>
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
        <Button title="Guardar" color="#BB6BD9" onPress={handleSave} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  image: {
    width: 200,
    height: 150,
    marginVertical: 10,
  },
});

export default CrearOferta;
