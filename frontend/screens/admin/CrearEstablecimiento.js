import React, { useState } from 'react';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
  Image
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import FondoComun from '../../components/FondoComun';

const CrearEstablecimiento = () => {
  const [nombre, setNombre] = useState('');
  const [cif, setCIF] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [checkBoxState, setCheckBoxState] = useState({
    Bar: false,
    Indie: false,
    Reggaeton: false,
    Monólogos: false,
    Cine: false,
    Cervezas: false,
  });

  const handleCheckBoxChange = (boxName) => {
    setCheckBoxState(prevState => ({
      ...prevState,
      [boxName]: !prevState[boxName],
    }));
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
  
    // Crear un array de strings para 'ambiente' y añadirlo como tal a FormData
    const ambienteArray = selectedCheckBoxes; // Esta es la variable intermedia que es un array de strings
    data.append('ambiente', ambienteArray); // Añadir el array de strings como un string JSON
  
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
      const response = await axios.post('http://192.168.1.107:5000/establecimientos', data, {
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
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
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
          <Text style={styles.label}>Ambiente:</Text>
          <View style={styles.checkboxContainer}>
            {Object.keys(checkBoxState).map((key) => (
              <CheckBoxElement
                key={key}
                title={key}
                checked={checkBoxState[key]}
                onPress={() => handleCheckBoxChange(key)}
                containerStyle={styles.checkbox}
                textStyle={styles.checkboxText}
              />
            ))}
          </View>
          <Button title="Seleccionar Imagen Establecimiento" onPress={selectImage} />
          {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// CheckBoxElement Function Component
const CheckBoxElement = ({
  title = '',
  checked = false,
  onPress = () => {},
  containerStyle = {},
  textStyle = {},
}) => {
  return (
    <CheckBox
      title={title}
      checked={checked}
      onPress={onPress}
      containerStyle={containerStyle}
      textStyle={textStyle}
    />
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
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  checkboxWrapper: {
    width: '48%',
    marginBottom: 10,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  checkboxText: {
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 150,
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: 'purple',
    padding: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CrearEstablecimiento;
