import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert, Button } from 'react-native';
import axios from 'axios';
import FondoComun from '../../components/FondoComun';
import styles from '../../styles/stylesModify';
import ambientes from '../../components/Ambientes';
import SeleccionarPreferencia from '../../components/SeleccionarPreferencia';
import commonStyles from '../../styles/stylesCommon'
import BASE_URL from '../../config_ip';

const ModificarEstablecimiento = ({ establecimientoId = "665b5df730fb9962d8d08eea" }) => {
  const [data, setData] = useState({
    nombre_establecimiento: '',
    ambiente: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ambienteSeleccionado, setAmbienteSeleccionado] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/establecimientos/${establecimientoId}`)
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
  }, [establecimientoId]);

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

  const handleSubmit = () => {
    const { nombre_establecimiento, ambiente } = data;
    const updatedData = {
      nombre_establecimiento,
      ambiente,
    };

    axios.put(`${BASE_URL}/establecimientos/${establecimientoId}`, updatedData)
      .then(response => {
        Alert.alert('Éxito', 'Los datos del establecimiento han sido actualizados.');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema al actualizar los datos.');
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
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <FondoComun />
        <View style={commonStyles.dataContainer}>
          <Text style={commonStyles.label}>Modificar Datos del Establecimiento</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre del Establecimiento:</Text>
            <TextInput
              style={styles.input}
              value={data.nombre_establecimiento}
              onChangeText={(value) => handleInputChange('nombre_establecimiento', value)}
            />
          </View>
          <Text style={styles.preferencesTitle}>Ambiente:</Text>
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
    </View>
  );
};

export default ModificarEstablecimiento;
