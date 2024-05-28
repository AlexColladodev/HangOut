import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, TextInput, Button, Alert, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import FondoComun from '../../components/FondoComun';

const ModificarActividad = () => {
  const [data, setData] = useState({
    nombre_actividad: '',
    descripcion_actividad: '',
    fecha_actividad: new Date(),
    hora_actividad: new Date(),
    ubicacion: '',
    // Eliminar el estado de participantes
  });
  const [loading, setLoading] = useState(true);
  const [showFecha, setShowFecha] = useState(false);
  const [showHora, setShowHora] = useState(false);

  useEffect(() => {
    axios.get('http://10.133.133.241:5000/actividades/662f4ac4102ab5737049a6a7')
      .then(response => {
        const fetchedData = response.data;
        setData({
          nombre_actividad: fetchedData.nombre_actividad,
          descripcion_actividad: fetchedData.descripcion_actividad,
          fecha_actividad: new Date(fetchedData.fecha_actividad),
          hora_actividad: new Date(`1970-01-01T${fetchedData.hora_actividad}Z`),
          ubicacion: fetchedData.ubicacion,
          // No incluir los participantes en el estado
        });
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (field, value) => {
    setData(prevState => ({ ...prevState, [field]: value }));
  };

  const onChangeFecha = (event, selectedDate) => {
    const currentDate = selectedDate || data.fecha_actividad;
    setShowFecha(Platform.OS === 'ios');
    setData(prevState => ({ ...prevState, fecha_actividad: currentDate }));
  };

  const onChangeHora = (event, selectedDate) => {
    const currentDate = selectedDate || data.hora_actividad;
    setShowHora(Platform.OS === 'ios');
    setData(prevState => ({ ...prevState, hora_actividad: currentDate }));
  };

  const showDatepicker = () => {
    setShowFecha(true);
  };

  const showTimepicker = () => {
    setShowHora(true);
  };

  const handleSubmit = () => {
    const { nombre_actividad, descripcion_actividad, fecha_actividad, hora_actividad, ubicacion } = data;
    const updatedData = {
      nombre_actividad,
      descripcion_actividad,
      fecha_actividad: fecha_actividad.toISOString().split('T')[0], // Formato YYYY-MM-DD
      hora_actividad: hora_actividad.toTimeString().split(' ')[0], // Formato HH:mm:ss
      ubicacion,
      id_usuario_creador: '6627d03e4e75f4cf8d29bf51', // Añadir el id_usuario_creador por defecto
    };

    console.log('Updated data being sent:', updatedData); // Para depuración

    axios.put('http://10.133.133.241:5000/actividades/662f4ac4102ab5737049a6a7', updatedData)
      .then(response => {
        Alert.alert('Éxito', 'Los datos han sido actualizados.');
      })
      .catch(error => {
        console.error('Error detail:', error.response.data); // Esto te dará más detalle del error
        Alert.alert('Error', 'Hubo un problema al actualizar los datos.');
      });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Error al cargar los datos</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Modificar Datos Actividad</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre Actividad:</Text>
            <TextInput
              style={styles.input}
              value={data.nombre_actividad}
              onChangeText={(value) => handleInputChange('nombre_actividad', value)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Descripción Actividad:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={data.descripcion_actividad}
              onChangeText={(value) => handleInputChange('descripcion_actividad', value)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Fecha Actividad:</Text>
            <View style={styles.dateRow}>
              <TextInput
                value={data.fecha_actividad.getDate().toString()}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <TextInput
                value={data.fecha_actividad.toLocaleString('default', { month: 'short' })}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <TextInput
                value={data.fecha_actividad.getFullYear().toString()}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <Button onPress={showDatepicker} title="Cambiar" color="#FF5252" />
            </View>
            {showFecha && (
              <DateTimePicker
                value={data.fecha_actividad}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChangeFecha}
              />
            )}
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Hora Actividad:</Text>
            <View style={styles.dateRow}>
              <TextInput
                value={data.hora_actividad.getHours().toString()}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <TextInput
                value={data.hora_actividad.getMinutes().toString().padStart(2, '0')}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <Button onPress={showTimepicker} title="Cambiar" color="#FF5252" />
            </View>
            {showHora && (
              <DateTimePicker
                value={data.hora_actividad}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChangeHora}
              />
            )}
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Ubicación:</Text>
            <TextInput
              style={styles.input}
              value={data.ubicacion}
              onChangeText={(value) => handleInputChange('ubicacion', value)}
            />
          </View>
          <TouchableOpacity style={styles.modifyButton} onPress={handleSubmit}>
            <Text style={styles.modifyButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  dataContainer: {
    marginTop: 50,
    width: '100%',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  fieldContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
    width: '100%',
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
  modifyButton: {
    backgroundColor: 'purple',
    padding: 10,
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  modifyButtonText: {
    color: 'white',
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#E0F7FA',
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default ModificarActividad;
