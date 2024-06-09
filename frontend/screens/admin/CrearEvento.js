import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, Text, Platform, Alert, Image, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import Fondo from '../../components/Fondo';
import inputStyles from '../../styles/inputStyles';
import commonStyles from '../../styles/commonStyles';
import BASE_URL from '../../config_ip';
import Footer from '../../components/Footer';
import { AdminContext } from '../../context/AdminContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const CrearEvento = ({ navigation, route }) => {
  const [nombreEvento, setNombreEvento] = useState('');
  const [descripcionEvento, setDescripcionEvento] = useState('');
  const [fechaEvento, setFechaEvento] = useState(new Date());
  const [horaEvento, setHoraEvento] = useState(new Date());
  const [precio, setPrecio] = useState('');
  const [showFecha, setShowFecha] = useState(false);
  const [showHora, setShowHora] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const { id } = route.params;
  const { adminId } = useContext(AdminContext);

  useEffect(() => {
    navigation.setOptions({
      title: 'Crear Evento'
    });
  }, [navigation]);

  const onChangeFecha = (event, selectedDate) => {
    const currentDate = selectedDate || fechaEvento;
    setShowFecha(Platform.OS === 'ios');
    setFechaEvento(currentDate);
  };

  const onChangeHora = (event, selectedDate) => {
    const currentDate = selectedDate || horaEvento;
    setShowHora(Platform.OS === 'ios');
    setHoraEvento(currentDate);
  };

  const showDatepicker = () => {
    setShowFecha(true);
  };

  const showTimepicker = () => {
    setShowHora(true);
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
    const data = new FormData();
    data.append('nombre_evento', nombreEvento);
    data.append('descripcion_evento', descripcionEvento);
    data.append('fecha_evento', fechaEvento.toISOString().split('T')[0]); // formato YYYY-MM-DD
    data.append('hora_evento', horaEvento.toTimeString().split(' ')[0]); // formato HH:MM:SS
    data.append('precio', precio);
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

    console.log(data)

    try {
      const response = await axios.post(`${BASE_URL}/establecimientos/nuevo_evento`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Alert.alert('Éxito', 'Evento creado con éxito');
        setNombreEvento('');
        setDescripcionEvento('');
        setFechaEvento(new Date());
        setHoraEvento(new Date());
        setPrecio('');
        setImageUri(null);
        navigation.navigate('DatosEstablecimiento', { id });
      } else {
        const errorMsg = response.data.error || 'Hubo un problema al crear el evento';
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
              placeholder="Nombre Evento:"
              value={nombreEvento}
              onChangeText={setNombreEvento}
              style={inputStyles.input}
            />
            <TextInput
              placeholder="Descripción Evento:"
              value={descripcionEvento}
              onChangeText={setDescripcionEvento}
              style={inputStyles.input}
            />
            <View style={inputStyles.datePickerContainer}>
              <Text style={inputStyles.pickerLabel}>Fecha Evento:</Text>
              <View style={inputStyles.dateRow}>
                <TextInput
                  value={fechaEvento.getDate().toString()}
                  style={[inputStyles.dateInput, inputStyles.datePart]}
                  editable={false}
                />
                <TextInput
                  value={fechaEvento.toLocaleString('default', { month: 'short' })}
                  style={[inputStyles.dateInput, inputStyles.datePart]}
                  editable={false}
                />
                <TextInput
                  value={fechaEvento.getFullYear().toString()}
                  style={[inputStyles.dateInput, inputStyles.datePart]}
                  editable={false}
                />
                <Button onPress={showDatepicker} title="Cambiar" color="#FF5252" />
              </View>
              {showFecha && (
                <DateTimePicker
                  value={fechaEvento}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeFecha}
                />
              )}
            </View>
            <View style={inputStyles.datePickerContainer}>
              <Text style={inputStyles.pickerLabel}>Hora Evento:</Text>
              <View style={inputStyles.dateRow}>
                <TextInput
                  value={horaEvento.getHours().toString()}
                  style={[inputStyles.dateInput, inputStyles.datePart]}
                  editable={false}
                />
                <TextInput
                  value={horaEvento.getMinutes().toString().padStart(2, '0')}
                  style={[inputStyles.dateInput, inputStyles.datePart]}
                  editable={false}
                />
                <Button onPress={showTimepicker} title="Cambiar" color="#FF5252" />
              </View>
              {showHora && (
                <DateTimePicker
                  value={horaEvento}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeHora}
                />
              )}
            </View>
            <TextInput
              placeholder="Precio:"
              value={precio}
              onChangeText={text => setPrecio(text.replace(/[^0-9.]/g, ''))}
              style={inputStyles.input}
              keyboardType="numeric"
            />
            <Button title="Seleccionar Imagen Evento" onPress={selectImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={commonStyles.imageSelected} />}
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


export default CrearEvento;
