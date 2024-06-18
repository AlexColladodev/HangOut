import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, TextInput, Alert, Button } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fondo from '../../components/Fondo';
import inputStyles from '../../styles/inputStyles';
import ambientes from '../../components/Ambientes';
import SeleccionarPreferencia from '../../components/SeleccionarPreferencia';
import commonStyles from '../../styles/commonStyles';
import ambienteStyles from '../../styles/ambienteStyles';
import BASE_URL from '../../config_ip';
import Footer from '../../components/Footer';
import { AdminContext } from '../../context/AdminContext';

const ModificarEstablecimiento = ({ navigation, route }) => {
  const [data, setData] = useState({
    nombre_establecimiento: '',
    ambiente: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ambienteSeleccionado, setAmbienteSeleccionado] = useState([]);
  const { id } = route.params;
  const { adminId } = useContext(AdminContext);

  useEffect(() => {
    navigation.setOptions({
      title: 'Modificar Establecimiento'
    });
  }, [navigation]);

  useEffect(() => {
    axios.get(`${BASE_URL}/establecimientos/${id}`)
      .then(response => {
        const fetchedData = response.data;
        setData({
          nombre_establecimiento: fetchedData.nombre_establecimiento,
          ambiente: fetchedData.ambiente,
        });
        setAmbienteSeleccionado(fetchedData.ambiente.map(amb => ambientes.findIndex(a => a.name === amb)));
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (field, value) => {
    setData(prevState => ({ ...prevState, [field]: value }));
  };

  const seleccionAmbiente = index => {
    const newSelectedTags = ambienteSeleccionado.includes(index)
      ? ambienteSeleccionado.filter(tag => tag !== index)
      : [...ambienteSeleccionado, index];
    setAmbienteSeleccionado(newSelectedTags);
    const newAmbiente = newSelectedTags.map(tagIndex => ambientes[tagIndex].name);
    setData(prevState => ({ ...prevState, ambiente: newAmbiente }));
  };

  const handleSave = () => {
    axios.put(`${BASE_URL}/establecimientos/${id}`, data)
      .then(response => {
        Alert.alert('Éxito', 'Establecimiento actualizado correctamente');
        navigation.navigate('InicioAdmin', { adminId });
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'No se pudo actualizar el establecimiento');
      });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={commonStyles.container}>
        <Text style={commonStyles.label}>Error al cargar los datos</Text>
        <Button title="Reintentar" onPress={() => setLoading(true)} />
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
            <Text style={commonStyles.fieldLabel}>Nombre del Establecimiento:</Text>
            <TextInput
              style={inputStyles.input}
              value={data.nombre_establecimiento}
              onChangeText={(value) => handleInputChange('nombre_establecimiento', value)}
            />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Ambiente:</Text>
            <SeleccionarPreferencia
              ambientes={ambientes}
              seleccionados={ambienteSeleccionado}
              seleccionAmbiente={seleccionAmbiente}
              styles={ambienteStyles}
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

export default ModificarEstablecimiento;
