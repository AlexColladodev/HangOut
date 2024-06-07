import React, { useState } from 'react';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert, Button, Image, Dimensions } from 'react-native';
import Fondo from '../../components/Fondo';
import styles from '../../styles/stylesCreate';
import ambientes from '../../components/Ambientes';
import SeleccionarPreferencia from '../../components/SeleccionarPreferencia';
import commonStyles from '../../styles/stylesCommon';
import BASE_URL from '../../config_ip';
import Header from '../../components/Header'
import Footer from '../../components/Footer';

const CrearEstablecimiento = () => {
  const [nombre, setNombre] = useState('');
  const [cif, setCIF] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [ambientesSeleccionados, setAmbientesSeleccionados] = useState([]);

  const seleccionAmbiente = index => {
    if (ambientesSeleccionados.includes(index)) {
      setAmbientesSeleccionados(ambientesSeleccionados.filter(ambiente => ambiente !== index));
    } else {
      setAmbientesSeleccionados([...ambientesSeleccionados, index]);
    }
  };

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
    const selectedAmbientes = ambientesSeleccionados.map(index => ambientes[index].name).join(',');
    const data = new FormData();
    data.append('nombre_establecimiento', nombre);
    data.append('cif', cif);
    data.append('ambiente', selectedAmbientes);
    data.append('id_administrador', '665b57a06bd71b0279ca3925');

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
      const response = await axios.post(`${BASE_URL}/establecimientos`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response: ', response.data);
      Alert.alert('Success', 'Establecimiento guardado exitosamente');
    } catch (error) {
      console.error('Error: ', error.response.data.error);
      Alert.alert('Error', error.response.data.error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header titulo="Crear Establecimiento" onBackPress={() => (navigation.goBack())} />
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={[commonStyles.container, { zIndex: 1 }]} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Nombre Establecimiento"
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              placeholder="CIF"
              style={styles.input}
              value={cif}
              onChangeText={setCIF}
            />
            <Text style={commonStyles.label}>Ambiente:</Text>
            <SeleccionarPreferencia 
              ambientes={ambientes}
              seleccionados={ambientesSeleccionados}
              seleccionAmbiente={seleccionAmbiente}
              styles={styles}
            />
            <Button title="Seleccionar Imagen Establecimiento" onPress={selectImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            <TouchableOpacity style={styles.boton} onPress={handleSave}>
              <Text style={styles.botonTexto}>Guardar</Text>
            </TouchableOpacity>
          </View>
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

export default CrearEstablecimiento;
