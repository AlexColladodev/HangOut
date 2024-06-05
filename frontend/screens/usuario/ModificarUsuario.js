import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert, Button, Platform, Image } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/es'; // Importar el locale español
import FondoComun from '../../components/FondoComun';
import styles from '../../styles/stylesModify';
import ambientes from '../../components/Ambientes';
import SeleccionarPreferencia from '../../components/SeleccionarPreferencia';
import commonStyles from '../../styles/stylesCommon';
import BASE_URL from '../../config_ip';

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

  const [ambienteSeleccionado, setAmbienteSeleccionado] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/usuario_generico/665b56eb6bd71b0279ca391b`)
      .then(response => {
        const fetchedData = response.data;
        setData({
          ...fetchedData,
          fecha_nacimiento: new Date(fetchedData.fecha_nac),
        });
        setAmbienteSeleccionado(fetchedData.preferencias.map(pref => ambientes.findIndex(amb => amb.name === pref)));
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

  const seleccionAmbiente = index => {
    const newSelectedTags = ambienteSeleccionado.includes(index)
      ? ambienteSeleccionado.filter(tag => tag !== index)
      : [...ambienteSeleccionado, index];
    setAmbienteSeleccionado(newSelectedTags);
    const newPreferencias = newSelectedTags.map(tagIndex => ambientes[tagIndex].name);
    setData(prevState => ({ ...prevState, preferencias: newPreferencias }));
  };

  const handleSubmit = () => {
    const { nombre, nombre_usuario, email, telefono, seguidos, preferencias, actividades_creadas, reviews } = data;
    const updatedData = {
      nombre,
      nombre_usuario,
      email,
      telefono,
      fecha_nacimiento: data.fecha_nacimiento.toISOString().split('T')[0], // Formato YYYY-MM-DD
      seguidos,
      preferencias,
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <FondoComun />
        <View style={commonStyles.dataContainer}>
          <Text style={commonStyles.label}>Modificar Datos Usuario</Text>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: data.imagen_url }} style={styles.profileImage} />
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
            seleccionados={ambienteSeleccionado}
            seleccionAmbiente={seleccionAmbiente}
            styles={styles}
          />
          <TouchableOpacity style={styles.modifyButton} onPress={handleSubmit}>
            <Text style={styles.modifyButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ModificarUsuario;
