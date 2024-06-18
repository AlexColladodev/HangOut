import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, Text, Platform, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fondo from '../../components/Fondo';
import axios from 'axios';
import BASE_URL from '../../config_ip';
import Footer from '../../components/Footer';
import commonStyles from '../../styles/commonStyles';
import inputStyles from '../../styles/inputStyles';
import { UserContext } from '../../context/UserContext';

const CrearActividad = ({ navigation }) => {
  const [nombreActividad, setNombreActividad] = useState('');
  const [descripcionActividad, setDescripcionActividad] = useState('');
  const [ubicacionActividad, setUbicacionActividad] = useState('');
  const [fechaActividad, setFechaActividad] = useState(new Date());
  const [horaActividad, setHoraActividad] = useState(new Date());
  const [showFecha, setShowFecha] = useState(false);
  const [showHora, setShowHora] = useState(false);
  const { userId, token } = useContext(UserContext);

  React.useEffect(() => {
    navigation.setOptions({
      title: 'Crear Actividad'
    });
  }, [navigation]);

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
        id_usuario_creador: userId,
      };
      const response = await axios.post(`${BASE_URL}/usuario_generico/nueva_actividad`, actividad);
      Alert.alert("Éxito", "Actividad creada correctamente");
      navigation.navigate('DatosUsuario', { userId });
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al crear la actividad");
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
              placeholder="Nombre Actividad:"
              value={nombreActividad}
              onChangeText={setNombreActividad}
              style={inputStyles.input}
            />
            <TextInput
              placeholder="Descripción Actividad:"
              value={descripcionActividad}
              onChangeText={setDescripcionActividad}
              style={inputStyles.input}
            />
            <TextInput
              placeholder="Ubicación Actividad:"
              value={ubicacionActividad}
              onChangeText={setUbicacionActividad}
              style={inputStyles.input}
            />
            <View style={inputStyles.datePickerContainer}>
              <Text style={inputStyles.pickerLabel}>Fecha actividad:</Text>
              <View style={inputStyles.dateRow}>
                <TextInput
                  value={fechaActividad.getDate().toString()}
                  style={[inputStyles.dateInput, inputStyles.datePart]}
                  editable={false}
                />
                <TextInput
                  value={fechaActividad.toLocaleString('default', { month: 'short' })}
                  style={[inputStyles.dateInput, inputStyles.datePart]}
                  editable={false}
                />
                <TextInput
                  value={fechaActividad.getFullYear().toString()}
                  style={[inputStyles.dateInput, inputStyles.datePart]}
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
            <View style={inputStyles.datePickerContainer}>
              <Text style={inputStyles.pickerLabel}>Hora actividad:</Text>
              <View style={inputStyles.dateRow}>
                <TextInput
                  value={horaActividad.getHours().toString()}
                  style={[inputStyles.dateInput, inputStyles.datePart]}
                  editable={false}
                />
                <TextInput
                  value={horaActividad.getMinutes().toString().padStart(2, '0')}
                  style={[inputStyles.dateInput, inputStyles.datePart]}
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
        <TouchableOpacity style={commonStyles.saveButton} onPress={handleSave}>
          <Text style={commonStyles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer
        showAddButton={true}
        onHangoutPressUser={() => navigation.navigate('InicioUsuario', { userId })}
        onProfilePressUser={() => navigation.navigate('DatosUsuario', { userId })}
        onCreateActivity={() => navigation.navigate('CrearActividad', { userId })}
      />
    </View>
  );
};

export default CrearActividad;
