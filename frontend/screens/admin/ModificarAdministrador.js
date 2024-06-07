import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image, SafeAreaView, TextInput, Alert, Button, Platform } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/es'; 
import Fondo from '../../components/Fondo';
import styles from '../../styles/stylesModify';
import commonStyles from '../../styles/stylesCommon'
import BASE_URL from '../../config_ip';
import Header from '../../components/Header'

const ModificarAdministrador = () => {
  const [data, setData] = useState({
    nombre: '',
    nombre_usuario: '',
    email_empresa: '',
    telefono: '+34 123 456 789',
    fecha_nacimiento: new Date('1970-01-01'),
  });
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    axios.get(`${BASE_URL}/administrador_establecimiento/665b583e6bd71b0279ca392d`)
      .then(response => {
        const fetchedData = response.data;
        setData({
          ...fetchedData,
          fecha_nacimiento: new Date(fetchedData.fecha_nac),
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

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || data.fecha_nacimiento;
    setShowDatePicker(Platform.OS === 'ios');
    setData(prevState => ({ ...prevState, fecha_nacimiento: currentDate }));
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleSave = () => {
    const { nombre, nombre_usuario, email_empresa } = data;
    const updatedData = {
      nombre,
      nombre_usuario,
      email_empresa,
      fecha_nacimiento: data.fecha_nacimiento.toISOString().split('T')[0], // Formato YYYY-MM-DD
    };

    axios.put(`${BASE_URL}/administrador_establecimiento/665b583e6bd71b0279ca392d`, updatedData)
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
      <View style={commonStyles.container}>
        <Text style={commonStyles.label}>Error al cargar los datos</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
    <Header titulo="Modificar Perfil" onBackPress={() => (navigation.goBack())} />
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: `${BASE_URL}${data.imagen_url}` }} style={styles.profileImage} />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre:</Text>
            <TextInput
              style={styles.input}
              value={data.nombre}
              onChangeText={(value) => handleInputChange('nombre', value)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre Usuario:</Text>
            <TextInput
              style={styles.input}
              value={data.nombre_usuario}
              onChangeText={(value) => handleInputChange('nombre_usuario', value)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Correo Electrónico:</Text>
            <TextInput
              style={styles.input}
              value={data.email_empresa}
              onChangeText={(value) => handleInputChange('email_empresa', value)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Teléfono:</Text>
            <TextInput
              style={styles.input}
              value={data.telefono}
              editable={false}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Fecha de Nacimiento:</Text>
            <View style={styles.dateRow}>
              <TextInput
                value={moment(data.fecha_nacimiento).format('DD')}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <TextInput
                value={moment(data.fecha_nacimiento).format('MMMM')}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <TextInput
                value={moment(data.fecha_nacimiento).format('YYYY')}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <Button onPress={showDatepicker} title="Cambiar" color="#FF5252" />
            </View>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={data.fecha_nacimiento}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
          <TouchableOpacity style={styles.boton} onPress={handleSave}>
            <Text style={styles.botonTexto}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ModificarAdministrador;
