import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, Text, Platform, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FondoComun from '../../components/FondoComun';
import axios from 'axios';

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
      await axios.post("http://192.168.1.107:5000/actividades", actividad);
      Alert.alert("Éxito", "Actividad creada correctamente");
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al crear la actividad");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <Text style={styles.title}>Crear Actividad</Text>
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
      </ScrollView>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
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
    paddingBottom: 100,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'center',
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
  datePickerContainer: {
    marginBottom: 20,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    marginRight: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  datePart: {
    flex: 1,
  },
  pickerLabel: {
    padding: 10,
    color: '#000',
  },
  saveButton: {
    backgroundColor: 'purple',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: '5%',
    right: '5%',
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CrearActividad;
