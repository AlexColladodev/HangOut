import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TextInput, Button, Alert, Platform, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import Fondo from '../../components/Fondo';
import inputStyles from '../../styles/inputStyles';
import commonStyles from '../../styles/commonStyles';
import BASE_URL from '../../config_ip';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { AdminContext } from '../../context/AdminContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const ModificarEvento = ({ navigation, route }) => {
  const [data, setData] = useState(route.params.data);
  const [loading, setLoading] = useState(true);
  const [showFecha, setShowFecha] = useState(false);
  const [showHora, setShowHora] = useState(false);
  const [fechaEvento, setFechaEvento] = useState(new Date(data.fecha_evento.$date));
  const [horaEvento, setHoraEvento] = useState(new Date(`1970-01-01T${data.hora_evento}`));
  const { adminId } = useContext(AdminContext);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleInputChange = (field, value) => {
    setData(prevState => ({ ...prevState, [field]: value }));
  };

  const onChangeFecha = (event, selectedDate) => {
    setShowFecha(false);
    if (selectedDate) {
      setFechaEvento(selectedDate);
    }
  };

  const onChangeHora = (event, selectedDate) => {
    setShowHora(false);
    if (selectedDate) {
      setHoraEvento(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowFecha(true);
  };

  const showTimepicker = () => {
    setShowHora(true);
  };

  const handleSave = async () => {
    const { _id, nombre_evento, descripcion_evento, precio, id_establecimiento, imagen_url } = data;

    const fechaEventoISO = fechaEvento.toISOString().split('T')[0]; 
    const horaEventoISO = horaEvento.toTimeString().split(' ')[0]; 

    const updatedData = {
      nombre_evento,
      descripcion_evento,
      fecha_evento: fechaEventoISO, 
      hora_evento: horaEventoISO, 
      precio: parseFloat(precio),
      id_establecimiento,
      imagen_url
    };

    let id = _id.$oid;

    try {
      const response = await axios.put(`${BASE_URL}/eventos/${id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        Alert.alert('Éxito', 'Evento actualizado con éxito');
        navigation.navigate('DatosEvento', { id });
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
          <View style={commonStyles.imageContainer}>
            <Image source={{ uri: `${BASE_URL}${data.imagen_url}` }} style={commonStyles.showImage} />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Nombre Evento:</Text>
            <TextInput
              style={inputStyles.input}
              value={data.nombre_evento}
              onChangeText={(value) => handleInputChange('nombre_evento', value)}
            />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Descripción Evento:</Text>
            <TextInput
              style={inputStyles.input}
              value={data.descripcion_evento}
              onChangeText={(value) => handleInputChange('descripcion_evento', value)}
            />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Fecha Evento:</Text>
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
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Hora Evento:</Text>
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
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Precio Evento:</Text>
            <TextInput
              style={inputStyles.input}
              value={data.precio.toString()}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('precio', value)}
            />
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

export default ModificarEvento;
