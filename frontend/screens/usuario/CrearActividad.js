import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, Text, Platform, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fondo from '../../components/Fondo';
import axios from 'axios';
import styles from '../../styles/stylesCreate';
import commonStyles from '../../styles/stylesCommon';
import BASE_URL from '../../config_ip';
import Header from '../../components/Header'

const CrearActividad = () => {
  const [nombreActividad, setNombreActividad] = useState('');
  const [descripcionActividad, setDescripcionActividad] = useState('');
  const [ubicacionActividad, setUbicacionActividad] = useState('');
  const [fechaActividad, setFechaActividad] = useState(new Date());
  const [horaActividad, setHoraActividad] = useState(new Date());
  const [showFecha, setShowFecha] = useState(false);
  const [showHora, setShowHora] = useState(false);

  const onChangeFecha = (event, selectedDate) => {
    const currentDate = selectedDate || fechaActividad;
    setShowFecha(Platform.OS === 'ios');
    setFechaActividad(currentDate);
  };

  const onChangeHora = (event, selectedDate) => {
    const currentDate = selectedDate || horaActividad;
    setShowHora(Platform.OS === 'ios');
    setHoraActividad(currentDate);
  };

  const showDatepicker = () => {
    setShowFecha(true);
  };

  const showTimepicker = () => {
    setShowHora(true);
  };

  const handleSave = async () => {
    try {
      const fechaFormat = fechaActividad.toISOString().split('T')[0];
      const horaFormat = horaActividad.toTimeString().split(' ')[0];
      const actividad = {
        nombre_actividad: nombreActividad,
        descripcion_actividad: descripcionActividad,
        ubicacion: ubicacionActividad,
        fecha_actividad: fechaFormat,
        hora_actividad: horaFormat,
        id_usuario_creador: "665b4db9f57ca863dfedffc2",
      };
      await axios.post(`${BASE_URL}/actividades`, actividad);
      Alert.alert("Éxito", "Actividad creada correctamente");
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al crear la actividad");
    }
  };

  return (
    <View style={{ flex: 1 }}>
    <Header titulo="Crear Actividad" onBackPress={() => (navigation.goBack())} />
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nombre Actividad:"
            value={nombreActividad}
            onChangeText={setNombreActividad}
            style={styles.input}
          />
          <TextInput
            placeholder="Descripción Actividad:"
            value={descripcionActividad}
            onChangeText={setDescripcionActividad}
            style={styles.input}
          />
          <TextInput
            placeholder="Ubicación Actividad:"
            value={ubicacionActividad}
            onChangeText={setUbicacionActividad}
            style={styles.input}
          />
          <View style={styles.datePickerContainer}>
            <Text style={styles.pickerLabel}>Fecha actividad:</Text>
            <View style={styles.dateRow}>
              <TextInput
                value={fechaActividad.getDate().toString()}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <TextInput
                value={fechaActividad.toLocaleString('default', { month: 'short' })}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <TextInput
                value={fechaActividad.getFullYear().toString()}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <Button onPress={showDatepicker} title="Cambiar" color="#FF5252" />
            </View>
            {showFecha && (
              <DateTimePicker
                value={fechaActividad}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChangeFecha}
              />
            )}
          </View>
          <View style={styles.datePickerContainer}>
            <Text style={styles.pickerLabel}>Hora actividad:</Text>
            <View style={styles.dateRow}>
              <TextInput
                value={horaActividad.getHours().toString()}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <TextInput
                value={horaActividad.getMinutes().toString().padStart(2, '0')}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <Button onPress={showTimepicker} title="Cambiar" color="#FF5252" />
            </View>
            {showHora && (
              <DateTimePicker
                value={horaActividad}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChangeHora}
              />
            )}
          </View>
        </View>
        </View>
        <TouchableOpacity style={styles.boton} onPress={handleSave}>
        <Text style={styles.botonTexto}>Guardar</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};


export default CrearActividad;
