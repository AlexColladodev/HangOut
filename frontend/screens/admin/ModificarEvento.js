import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, TextInput, Button, Alert, Platform, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import FondoComun from '../../components/FondoComun';
import styles from '../../styles/styles_mod';

const ModificarEvento = () => {
  const [data, setData] = useState({
    nombre_evento: '',
    descripcion_evento: '',
    fecha_evento: new Date(),
    hora_evento: new Date(),
    precio: '',
  });
  const [loading, setLoading] = useState(true);
  const [showFecha, setShowFecha] = useState(false);
  const [showHora, setShowHora] = useState(false);

  useEffect(() => {
    axios.get('http://10.133.133.241:5000/eventos/665e0db67d438e985b7b77b1')
      .then(response => {
        const fetchedData = response.data;
        setData({
          ...fetchedData,
          fecha_evento: new Date(fetchedData.fecha_evento.$date),
          hora_evento: new Date(`1970-01-01T${fetchedData.hora_evento}Z`),
          precio: fetchedData.precio.toString(),
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
    const currentDate = selectedDate || data.fecha_evento;
    setShowFecha(Platform.OS === 'ios');
    setData(prevState => ({ ...prevState, fecha_evento: currentDate }));
  };

  const onChangeHora = (event, selectedDate) => {
    const currentDate = selectedDate || data.hora_evento;
    setShowHora(Platform.OS === 'ios');
    setData(prevState => ({ ...prevState, hora_evento: currentDate }));
  };

  const showDatepicker = () => {
    setShowFecha(true);
  };

  const showTimepicker = () => {
    setShowHora(true);
  };

  const Modificar = () => {
    const { nombre_evento, descripcion_evento, fecha_evento, hora_evento, precio } = data;
    const updatedData = {
      nombre_evento,
      descripcion_evento,
      fecha_evento: fecha_evento.toISOString().split('T')[0], // Formato YYYY-MM-DD
      hora_evento: hora_evento.toTimeString().split(' ')[0], // Formato HH:mm:ss
      precio: parseFloat(precio), // Convert to number
    };

    axios.put('http://10.133.133.241:5000/eventos/665e0db67d438e985b7b77b1', updatedData)
      .then(response => {
        Alert.alert('Éxito', 'Los datos han sido actualizados.');
      })
      .catch(error => {
        console.error(error);
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
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Modificar Datos Evento</Text>
          <View style={styles.imagenContainer}>
            <Image source={{ uri: data.imagen_url }} style={styles.imagen} />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre Evento:</Text>
            <TextInput
              style={styles.input}
              value={data.nombre_evento}
              onChangeText={(value) => handleInputChange('nombre_evento', value)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Descripción Evento:</Text>
            <TextInput
              style={styles.input}
              value={data.descripcion_evento}
              onChangeText={(value) => handleInputChange('descripcion_evento', value)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Fecha Evento:</Text>
            <View style={styles.dateRow}>
              <TextInput
                value={data.fecha_evento.getDate().toString()}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <TextInput
                value={data.fecha_evento.toLocaleString('default', { month: 'short' })}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <TextInput
                value={data.fecha_evento.getFullYear().toString()}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <Button onPress={showDatepicker} title="Cambiar" color="#FF5252" />
            </View>
            {showFecha && (
              <DateTimePicker
                value={data.fecha_evento}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChangeFecha}
              />
            )}
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Hora Evento:</Text>
            <View style={styles.dateRow}>
              <TextInput
                value={data.hora_evento.getHours().toString()}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <TextInput
                value={data.hora_evento.getMinutes().toString().padStart(2, '0')}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <Button onPress={showTimepicker} title="Cambiar" color="#FF5252" />
            </View>
            {showHora && (
              <DateTimePicker
                value={data.hora_evento}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChangeHora}
              />
            )}
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Precio Evento:</Text>
            <TextInput
              style={styles.input}
              value={data.precio}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('precio', value)}
            />
          </View>
          <TouchableOpacity style={styles.modifyButton} onPress={Modificar}>
            <Text style={styles.modifyButtonText}>Modificar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};


export default ModificarEvento;
