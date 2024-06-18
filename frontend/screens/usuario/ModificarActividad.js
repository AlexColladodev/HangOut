import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, TextInput, Button, Alert, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es';
import Fondo from '../../components/Fondo';
import commonStyles from '../../styles/commonStyles';
import inputStyles from '../../styles/inputStyles';
import BASE_URL from '../../config_ip';
import Footer from '../../components/Footer';
import { UserContext } from '../../context/UserContext';

const ModificarActividad = ({ navigation, route }) => {
  const { actividad } = route.params;
  const [data, setData] = useState(actividad);
  const [showFecha, setShowFecha] = useState(false);
  const [showHora, setShowHora] = useState(false);
  const [fechaActividad, setFechaActividad] = useState(new Date(data.fecha_actividad.$date));
  const [horaActividad, setHoraActividad] = useState(new Date(`1970-01-01T${data.hora_actividad}`));
  const { userId, token } = useContext(UserContext);

  useEffect(() => {
    navigation.setOptions({
      title: 'Modificar Actividad'
    });
  }, [navigation]);

  const handleInputChange = (field, value) => {
    setData(prevState => ({ ...prevState, [field]: value }));
  };

  const onChangeFecha = (event, selectedDate) => {
    setShowFecha(false);
    if (selectedDate) {
      setFechaActividad(selectedDate);
    }
  };

  const onChangeHora = (event, selectedDate) => {
    setShowHora(false);
    if (selectedDate) {
      setHoraActividad(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowFecha(true);
  };

  const showTimepicker = () => {
    setShowHora(true);
  };

  const handleSubmit = () => {
    const { nombre_actividad, descripcion_actividad, ubicacion, participantes } = data;

    const fechaActividadISO = fechaActividad.toISOString().split('T')[0];
    const horaActividadISO = horaActividad.toTimeString().split(' ')[0];
    const fechaNuevaActividadISO = fechaActividad.toISOString();

    const updatedData = {
      nombre_actividad,
      descripcion_actividad,
      fecha_actividad: fechaActividadISO,
      hora_actividad: horaActividadISO,
      ubicacion,
      id_usuario_creador: userId,
      participantes
    };

    let id = data._id.$oid;

    axios.put(`${BASE_URL}/actividades/${id}`, updatedData)
      .then(response => {
        Alert.alert('Éxito', 'Los datos han sido actualizados.');

        const nuevaActividad = {
          ...updatedData,
          _id: data._id,
          fecha_actividad: { $date: fechaNuevaActividadISO },
          perfil_participantes: data.perfil_participantes
        };

        navigation.navigate('DatosActividad', { actividad: nuevaActividad });
      })
      .catch(error => {
        console.error('Error detail:', error.response.data);
        Alert.alert('Error', 'Hubo un problema al actualizar los datos.');
      });
  };

  if (!data) {
    return (
      <View style={commonStyles.container}>
        <Text style={commonStyles.label}>Error al cargar los datos</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Nombre Actividad:</Text>
            <TextInput
              style={inputStyles.input}
              value={data.nombre_actividad}
              onChangeText={(value) => handleInputChange('nombre_actividad', value)}
            />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Descripción Actividad:</Text>
            <TextInput
              style={[inputStyles.input]}
              value={data.descripcion_actividad}
              onChangeText={(value) => handleInputChange('descripcion_actividad', value)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Fecha Actividad:</Text>
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
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Hora Actividad:</Text>
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
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Ubicación:</Text>
            <TextInput
              style={inputStyles.input}
              value={data.ubicacion}
              onChangeText={(value) => handleInputChange('ubicacion', value)}
            />
          </View>
          <TouchableOpacity style={commonStyles.saveButton} onPress={handleSubmit}>
            <Text style={commonStyles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
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

export default ModificarActividad;
