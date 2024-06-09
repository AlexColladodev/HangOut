import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, Text, Platform, Image, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import Fondo from '../../components/Fondo';
import styles from '../../styles/stylesTipoAdmin';
import commonStyles from '../../styles/stylesCommon';
import axios from 'axios';
import SeleccionarPreferencia from '../../components/SeleccionarPreferencia';
import BASE_URL from '../../config_ip';
import ambientes from '../../components/Ambientes'
import stylesTipoUsuario from '../../styles/stylesTipoUsuario';
import stylesTipoAdmin from '../../styles/stylesTipoAdmin';

const RegistrarseComun = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [isAccountTypeValid, setIsAccountTypeValid] = useState(true);
  const [imageUri, setImageUri] = useState(null);

  const [nombre, setNombre] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [telefono, setTelefono] = useState('');
  const [dni, setDni] = useState('');

  const [ambientesSeleccionados, setAmbientesSeleccionados] = useState([]);

  const seleccionAmbiente = index => {
    if (ambientesSeleccionados.includes(index)) {
      setAmbientesSeleccionados(ambientesSeleccionados.filter(ambiente => ambiente !== index));
    } else {
      setAmbientesSeleccionados([...ambientesSeleccionados, index]);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'Registro'
    });
  }, [navigation]);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
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

  const resetForm = () => {
    setNombre('');
    setNombreUsuario('');
    setContraseña('');
    setCorreoElectronico('');
    setTelefono('');
    setDni('');
    setDate(new Date());
    setAccountType('');
    setIsAccountTypeValid(true);
    setImageUri(null);
    setAmbientesSeleccionados([]);
  };

  const handleSubmit = async () => {
    if (accountType === "") {
      setIsAccountTypeValid(false);
      Alert.alert("Error", "Por favor, seleccione un tipo de cuenta.");
      return;
    }
    const selectedAmbientes = ambientesSeleccionados.map(index => ambientes[index].name).join(',');

    const formattedDate = date.toISOString().split('T')[0];
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('nombre_usuario', nombreUsuario);
    formData.append('password', contraseña);
    formData.append('email', correoElectronico);
    formData.append('telefono', telefono);
    formData.append('fecha_nac', formattedDate);

    if (imageUri) {
      const uriParts = imageUri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append('imagen', {
        uri: imageUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    } else {
      formData.append('imagen', null);
    }


    try {
      if (accountType === "Administrador de Establecimiento") {
        formData.append('dni', dni);
        await axios.post(`${BASE_URL}/administrador_establecimiento`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        formData.append('preferencias', selectedAmbientes);
        await axios.post(`${BASE_URL}/usuario_generico`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        });
      }
      Alert.alert("Éxito", "Cuenta creada exitosamente.");
      resetForm();
      navigation.navigate('InicioSesion');
    } catch (error) {
      let errorMessage = "Hubo un problema al crear la cuenta.";
      if (error.response && error.response.data && error.response.data.error) {
        const errorData = error.response.data.error;
        if (typeof errorData === 'object') {
          const firstKey = Object.keys(errorData)[0];
          errorMessage = errorData[firstKey][0];
        } else {
          errorMessage = errorData;
        }
      }
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: -1 }}>
          <Fondo />
        </View>
        <View style={commonStyles.dataContainer}>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Nombre" style={styles.input} onChangeText={setNombre} value={nombre} />
            <TextInput placeholder="Nombre Usuario" style={styles.input} onChangeText={setNombreUsuario} value={nombreUsuario} />
            <TextInput placeholder="Contraseña" secureTextEntry={true} style={styles.input} onChangeText={setContraseña} value={contraseña} />
            <TextInput placeholder="Correo Electrónico" keyboardType="email-address" style={styles.input} onChangeText={setCorreoElectronico} value={correoElectronico} />
            <TextInput placeholder="Teléfono" keyboardType="phone-pad" style={styles.input} onChangeText={setTelefono} value={telefono} />

            <View style={styles.datePickerContainer}>
              <Text style={styles.pickerLabel}>Fecha de Nacimiento</Text>
              <View style={styles.dateRow}>
                <TextInput
                  value={date.getDate().toString()}
                  style={[styles.dateInput, styles.datePart]}
                  editable={false}
                />
                <TextInput
                  value={date.toLocaleString('default', { month: 'short' })}
                  style={[styles.dateInput, styles.datePart]}
                  editable={false}
                />
                <TextInput
                  value={date.getFullYear().toString()}
                  style={[styles.dateInput, styles.datePart]}
                  editable={false}
                />
                <Button onPress={showDatepicker} title="Cambiar" color="#FF5252" />
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeDate}
                />
              )}
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Tipo de Cuenta</Text>
              <Picker
                selectedValue={accountType}
                onValueChange={(itemValue, itemIndex) => setAccountType(itemValue)}
                style={isAccountTypeValid ? {} : { borderColor: 'red', borderWidth: 1 }}
              >
                <Picker.Item label="Seleccione una opción..." value="" />
                <Picker.Item label="Usuario" value="Usuario" />
                <Picker.Item label="Administrador de Establecimiento" value="Administrador de Establecimiento" />
              </Picker>
              {!isAccountTypeValid && <Text style={styles.errorText}>Seleccione un tipo de cuenta válido.</Text>}
            </View>

            {accountType === "Administrador de Establecimiento" && (
              <View style={stylesTipoAdmin.inputContainer}>
                <Text style={stylesTipoAdmin.dniLabel}>DNI:</Text>
                <TextInput 
                  style={stylesTipoAdmin.input}
                  placeholder="Ingrese su DNI"
                  value={dni}
                  onChangeText={setDni}
                />
              </View>
            )}

            {accountType === "Usuario" && (
              <View style={commonStyles.dataContainer}>
                <Text style={stylesTipoUsuario.preferencesTitle}>Preferencias:</Text>
                <SeleccionarPreferencia 
                  ambientes={ambientes}
                  seleccionados={ambientesSeleccionados}
                  seleccionAmbiente={seleccionAmbiente}
                  styles={stylesTipoUsuario}
                />
              </View>
            )}

            <Button title="Seleccionar Foto de Perfil" onPress={selectImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
          </View>
          <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
            <Text style={styles.botonTexto}>Crear Cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegistrarseComun
