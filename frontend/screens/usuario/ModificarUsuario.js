import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert, Button, Platform, Image } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/es';
import Fondo from '../../components/Fondo';
import styles from '../../styles/stylesModify';
import ambientes from '../../components/Ambientes';
import SeleccionarPreferencia from '../../components/SeleccionarPreferencia';
import commonStyles from '../../styles/stylesCommon';
import BASE_URL from '../../config_ip';
import Header from '../../components/Header'
import Footer from '../../components/Footer';

const ModificarUsuario = () => {
  const [data, setData] = useState({
    nombre: '',
    nombre_usuario: '',
    email: '',
    telefono: '',
    fecha_nacimiento: new Date(),
    seguidos: [],
    preferencias: [],
    actividades_creadas: [],
    reviews: [],
  });
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [preferenciaSeleccionada, setPreferenciaSeleccionada] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/usuario_generico/665b56eb6bd71b0279ca391b`)
      .then(response => {
        const fetchedData = response.data;
        setData({
          ...fetchedData,
          fecha_nacimiento: new Date(fetchedData.fecha_nac),
          preferencias: fetchedData.preferencias || [], 
        });
        setPreferenciaSeleccionada(
          (fetchedData.preferencias || []).map(pref => ambientes.findIndex(a => a.name === pref))
        );
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

  const seleccionPreferencia = index => {
    const newSelectedTags = preferenciaSeleccionada.includes(index)
      ? preferenciaSeleccionada.filter(tag => tag !== index)
      : [...preferenciaSeleccionada, index];
    setPreferenciaSeleccionada(newSelectedTags);
    const newPreferencias = newSelectedTags.map(tagIndex => ambientes[tagIndex]?.name);
    setData(prevState => ({ ...prevState, preferencias: newPreferencias }));
  };

  const handleSubmit = () => {
    const { nombre, nombre_usuario, email, telefono, seguidos, preferencias, actividades_creadas, reviews } = data;
    const updatedData = {
      nombre,
      nombre_usuario,
      email,
      telefono,
      fecha_nacimiento: data.fecha_nacimiento.toISOString().split('T')[0],
      seguidos,
      preferencias: preferencias.join(','),
      actividades_creadas,
      reviews,
    };

    axios.put(`${BASE_URL}/usuario_generico/665b56eb6bd71b0279ca391b`, updatedData)
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
              value={data.email}
              onChangeText={(value) => handleInputChange('email', value)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Teléfono:</Text>
            <TextInput
              style={styles.input}
              value={data.telefono}
              onChangeText={(value) => handleInputChange('telefono', value)}
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
          <Text style={styles.preferencesTitle}>Preferencias:</Text>
          <SeleccionarPreferencia 
            ambientes={ambientes}
            seleccionados={preferenciaSeleccionada}
            seleccionAmbiente={seleccionPreferencia}
            styles={styles}
          />
          <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
            <Text style={styles.botonTexto}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer 
        onHangoutPress={() => console.log('Hangout Pressed')} 
        onAddPress={() => console.log('Add Pressed')} 
        onProfilePress={() => console.log('Profile Pressed')} 
        showAddButton={true} 
      />
    </View>
  );
};

export default ModificarUsuario;
