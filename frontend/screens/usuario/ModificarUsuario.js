import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Button, Image } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fondo from '../../components/Fondo';
import ambientes from '../../components/Ambientes';
import SeleccionarPreferencia from '../../components/SeleccionarPreferencia';
import commonStyles from '../../styles/commonStyles';
import BASE_URL from '../../config_ip';
import Footer from '../../components/Footer';
import { UserContext } from '../../context/UserContext';
import inputStyles from '../../styles/inputStyles';
import ambienteStyles from '../../styles/ambienteStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const ModificarUsuario = ({ navigation, route }) => {
  const [showFecha, setShowFecha] = useState(false);
  const [preferenciaSeleccionada, setPreferenciaSeleccionada] = useState([]);
  const [data, setData] = useState(route.params.data);
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date(data.usuario.fecha_nac.$date));
  const { userId, token } = useContext(UserContext);

  useEffect(() => {
    navigation.setOptions({
      title: 'Modificar Perfil'
    });

    const preferenciasIndices = data.usuario.preferencias.map(pref =>
      ambientes.findIndex(amb => amb.name === pref)
    );
    setPreferenciaSeleccionada(preferenciasIndices);
  }, [navigation, data]);

  const handleInputChange = (field, value) => {
    setData(prevState => ({ ...prevState, usuario: { ...prevState.usuario, [field]: value } }));
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

  const seleccionPreferencia = index => {
    const newSelectedTags = preferenciaSeleccionada.includes(index)
      ? preferenciaSeleccionada.filter(tag => tag !== index)
      : [...preferenciaSeleccionada, index];
    setPreferenciaSeleccionada(newSelectedTags);
    const newPreferencias = newSelectedTags.map(tagIndex => ambientes[tagIndex]?.name);
    setData(prevState => ({ ...prevState, usuario: { ...prevState.usuario, preferencias: newPreferencias } }));
  };

  const handleSubmit = () => {
    const { nombre, nombre_usuario, email, telefono, seguidos, preferencias, actividades_creadas, reviews } = data.usuario;
    const fechaNacimientoISO = fechaNacimiento.toISOString().split('T')[0];
    const updatedData = {
      nombre,
      nombre_usuario,
      email,
      telefono,
      fecha_nac: fechaNacimientoISO,
      seguidos,
      preferencias,
      actividades_creadas,
      reviews,
    };

    axios.put(`${BASE_URL}/usuario_generico/${userId}`, updatedData)
      .then(response => {
        Alert.alert('Éxito', 'Los datos han sido actualizados.');
        navigation.navigate('DatosUsuario', { userId });
      })
      .catch(error => {
        console.error(error);
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
          <View style={commonStyles.profileImageContainer}>
            <Image source={{ uri: `${BASE_URL}${data.usuario.imagen_url}` }} style={commonStyles.profileImage} />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Nombre:</Text>
            <TextInput
              style={inputStyles.input}
              value={data.usuario.nombre}
              onChangeText={(value) => handleInputChange('nombre', value)}
            />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Nombre Usuario:</Text>
            <TextInput
              style={inputStyles.input}
              value={data.usuario.nombre_usuario}
              onChangeText={(value) => handleInputChange('nombre_usuario', value)}
            />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Correo Electrónico:</Text>
            <TextInput
              style={inputStyles.input}
              value={data.usuario.email}
              onChangeText={(value) => handleInputChange('email', value)}
            />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Teléfono:</Text>
            <TextInput
              style={inputStyles.input}
              value={data.usuario.telefono}
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
          <Text style={commonStyles.preferencesTitle}>Preferencias:</Text>
          <SeleccionarPreferencia
            ambientes={ambientes}
            seleccionados={preferenciaSeleccionada}
            seleccionAmbiente={seleccionPreferencia}
            styles={ambienteStyles}
          />
          <TouchableOpacity style={commonStyles.saveButton} onPress={handleSubmit}>
            <Text style={commonStyles.saveButtonText}>Guardar</Text>
            <Icon name="save" size={30} color="#000" />
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

export default ModificarUsuario;
