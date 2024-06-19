import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert, Button, Image } from 'react-native';
import Fondo from '../../components/Fondo';
import inputStyles from '../../styles/inputStyles';
import ambienteStyles from '../../styles/ambienteStyles';
import ambientes from '../../components/Ambientes';
import SeleccionarPreferencia from '../../components/SeleccionarPreferencia';
import commonStyles from '../../styles/commonStyles';
import BASE_URL from '../../config_ip';
import Footer from '../../components/Footer';
import { AdminContext } from '../../context/AdminContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const CrearEstablecimiento = ({ navigation, route }) => {
  const { adminId } = useContext(AdminContext);
  const [nombre, setNombre] = useState('');
  const [cif, setCIF] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [ambientesSeleccionados, setAmbientesSeleccionados] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: 'Crear Establecimiento'
    });
  }, [navigation]);

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
    data.append('id_administrador', adminId);

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
      let id = response.data.id;
      Alert.alert('Success', 'Establecimiento guardado exitosamente');
      navigation.navigate('InicioAdmin', {});
    } catch (error) {
      console.error('Error: ', error.response.data.error);
      Alert.alert('Error', error.response.data.error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={[commonStyles.container, { zIndex: 1 }]} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <View style={inputStyles.inputContainer}>
            <TextInput
              placeholder="Nombre Establecimiento"
              style={inputStyles.input}
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              placeholder="CIF"
              style={inputStyles.input}
              value={cif}
              onChangeText={setCIF}
            />
            <Text style={commonStyles.label}>Ambiente:</Text>
            <SeleccionarPreferencia
              ambientes={ambientes}
              seleccionados={ambientesSeleccionados}
              seleccionAmbiente={seleccionAmbiente}
              styles={ambienteStyles}
            />
            <Button title="Seleccionar Imagen Establecimiento" onPress={selectImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={commonStyles.imageSelected} />}
            <TouchableOpacity style={commonStyles.saveButton} onPress={handleSave}>
              <Text style={commonStyles.saveButtonText}>Guardar</Text>
              <Icon name="save" size={30} color="#000" />
            </TouchableOpacity>
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

export default CrearEstablecimiento;
