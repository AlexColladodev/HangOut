import React, { useState } from 'react';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert, Button, Image } from 'react-native';
import FondoComun from '../../components/FondoComun';
import styles from '../../styles/stylesCreate';
import ambientes from '../../components/Ambientes'
import SeleccionarPreferencia from '../../components/SeleccionarPreferencia';
import commonStyles from '../../styles/stylesCommon'
import BASE_URL from '../../config_ip';

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

  const handleSubmit = async () => {
    const selectedCheckBoxes = Object.keys(checkBoxState).filter(key => checkBoxState[key]);
    const data = new FormData();
    data.append('nombre_establecimiento', nombre);
    data.append('cif', cif);
  

    const ambienteArray = selectedCheckBoxes; 
    data.append('ambiente', ambienteArray); 
  
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
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <FondoComun />
        <View style={commonStyles.dataContainer}>
        <Text style={styles.title}>Crear Establecimiento</Text> 
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
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </View>
  );
};


export default CrearEstablecimiento;
