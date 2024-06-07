import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, Text, Platform, Alert, Image, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import Fondo from '../../components/Fondo';
import styles from '../../styles/stylesCreate';
import commonStyles from '../../styles/stylesCommon';
import BASE_URL from '../../config_ip';
import Header from '../../components/Header'
import Footer from '../../components/Footer';

const CrearEvento = () => {
  const [nombreEvento, setNombreEvento] = useState('');
  const [descripcionEvento, setDescripcionEvento] = useState('');
  const [fechaEvento, setFechaEvento] = useState(new Date());
  const [horaEvento, setHoraEvento] = useState(new Date());
  const [precioEvento, setPrecioEvento] = useState('');
  const [showFecha, setShowFecha] = useState(false);
  const [showHora, setShowHora] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const idEstablecimiento = '666197975ccba976dcffb41e';

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
    data.append('precio', precioEvento);
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
      const response = await fetch(`${BASE_URL}/establecimientos/nuevo_evento`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Evento creado con éxito');
        setNombreEvento('');
        setDescripcionEvento('');
        setFechaEvento(new Date());
        setHoraEvento(new Date());
        setPrecioEvento('');
        setImageUri(null);
      } else {
        Alert.alert('Error', 'Hubo un problema al crear el evento');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header titulo="Crear Evento" onBackPress={() => (navigation.goBack())} />
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Nombre Evento:"
              value={nombreEvento}
              onChangeText={setNombreEvento}
              style={styles.input}
            />
            <TextInput
              placeholder="Descripción Evento:"
              value={descripcionEvento}
              onChangeText={setDescripcionEvento}
              style={styles.input}
            />
            <View style={styles.datePickerContainer}>
              <Text style={styles.pickerLabel}>Fecha Evento:</Text>
              <View style={styles.dateRow}>
                <TextInput
                  value={fechaEvento.getDate().toString()}
                  style={[styles.dateInput, styles.datePart]}
                  editable={false}
                />
                <TextInput
                  value={fechaEvento.toLocaleString('default', { month: 'short' })}
                  style={[styles.dateInput, styles.datePart]}
                  editable={false}
                />
                <TextInput
                  value={fechaEvento.getFullYear().toString()}
                  style={[styles.dateInput, styles.datePart]}
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
            <View style={styles.datePickerContainer}>
              <Text style={styles.pickerLabel}>Hora Evento:</Text>
              <View style={styles.dateRow}>
                <TextInput
                  value={horaEvento.getHours().toString()}
                  style={[styles.dateInput, styles.datePart]}
                  editable={false}
                />
                <TextInput
                  value={horaEvento.getMinutes().toString().padStart(2, '0')}
                  style={[styles.dateInput, styles.datePart]}
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
              placeholder="Precio Evento:"
              value={precioEvento}
              onChangeText={text => setPrecioEvento(text.replace(/[^0-9.]/g, ''))}
              style={styles.input}
              keyboardType="numeric"
            />
            <Button title="Seleccionar Imagen Evento" onPress={selectImage} />
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

export default CrearEvento;
