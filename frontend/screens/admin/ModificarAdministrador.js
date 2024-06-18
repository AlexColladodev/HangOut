import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert, Button, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import Fondo from '../../components/Fondo';
import commonStyles from '../../styles/commonStyles';
import inputStyles from '../../styles/inputStyles';
import BASE_URL from '../../config_ip';
import Footer from '../../components/Footer';
import { AdminContext } from '../../context/AdminContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const ModificarAdministrador = ({ navigation, route }) => {
  const { adminId, token } = useContext(AdminContext);
  const [data, setData] = useState(route.params.data);
  const [showFecha, setShowFecha] = useState(false);
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date(data.fecha_nac.$date));

  const handleInputChange = (field, value) => {
    setData(prevState => ({ ...prevState, [field]: value }));
  };

  const onChangeFecha = (event, selectedDate) => {
    setShowFecha(false);
    if (selectedDate) {
      setFechaNacimiento(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowFecha(true);
  };

  const handleSave = async () => {
    const { nombre, nombre_usuario, email, telefono, imagen_url } = data;
    const fechaNacimientoISO = fechaNacimiento.toISOString().split('T')[0];
    const updatedData = {
      dni: data.dni,
      establecimientos: data.establecimientos,
      password: 'x',
      nombre,
      nombre_usuario,
      email,
      fecha_nac: fechaNacimientoISO,
      telefono,
      imagen_url,
    };

    let id = data._id.$oid;

    try {
      const response = await axios.put(`${BASE_URL}/administrador_establecimiento/${id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        Alert.alert('Éxito', 'Datos del administrador actualizados con éxito');
        navigation.navigate('DatosAdministrador', { id });
      } else {
        const errorMsg = response.data.error || 'Hubo un problema al actualizar los datos';
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
          <View style={commonStyles.profileImageContainer}>
            <Image source={{ uri: `${BASE_URL}${data.imagen_url}` }} style={commonStyles.profileImage} />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Nombre:</Text>
            <TextInput
              style={inputStyles.input}
              value={data.nombre}
              onChangeText={(value) => handleInputChange('nombre', value)}
            />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Nombre Usuario:</Text>
            <TextInput
              style={inputStyles.input}
              value={data.nombre_usuario}
              onChangeText={(value) => handleInputChange('nombre_usuario', value)}
            />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Correo Electrónico:</Text>
            <TextInput
              style={inputStyles.input}
              value={data.email}
              onChangeText={(value) => handleInputChange('email', value)}
            />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Teléfono:</Text>
            <TextInput
              style={inputStyles.input}
              value={data.telefono}
              onChangeText={(value) => handleInputChange('telefono', value)}
            />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Fecha de Nacimiento:</Text>
            <View style={inputStyles.dateRow}>
              <TextInput
                value={fechaNacimiento.getDate().toString()}
                style={[inputStyles.dateInput, inputStyles.datePart]}
                editable={false}
              />
              <TextInput
                value={fechaNacimiento.toLocaleString('default', { month: 'short' })}
                style={[inputStyles.dateInput, inputStyles.datePart]}
                editable={false}
              />
              <TextInput
                value={fechaNacimiento.getFullYear().toString()}
                style={[inputStyles.dateInput, inputStyles.datePart]}
                editable={false}
              />
              <Button onPress={showDatepicker} title="Cambiar" color="#FF5252" />
            </View>
            {showFecha && (
              <DateTimePicker
                value={fechaNacimiento}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChangeFecha}
              />
            )}
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

export default ModificarAdministrador;
