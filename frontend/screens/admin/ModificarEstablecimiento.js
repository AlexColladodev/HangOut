import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert, Button } from 'react-native';
import axios from 'axios';
import Fondo from '../../components/Fondo';
import styles from '../../styles/stylesModify';
import ambientes from '../../components/Ambientes';
import SeleccionarPreferencia from '../../components/SeleccionarPreferencia';
import commonStyles from '../../styles/stylesCommon'
import BASE_URL from '../../config_ip';
import Header from '../../components/Header'
import Footer from '../../components/Footer';

const ModificarEstablecimiento = ({ establecimientoId = "666197975ccba976dcffb41e" }) => {
  const [data, setData] = useState({
    nombre_establecimiento: '',
    ambiente: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ambienteSeleccionado, setAmbienteSeleccionado] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/establecimientos/666197975ccba976dcffb41e`)
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

  const handleSave = () => {
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

  console.log(data)

  return (
    <View style={{ flex: 1 }}>
    <Header titulo="Modificar Establecimiento" onBackPress={() => (navigation.goBack())} />
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
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
          <TouchableOpacity style={styles.boton} onPress={handleSave}>
            <Text style={styles.botonTexto}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer 
        onHangoutPress={() => console.log('Hangout Pressed')} 
        onAddPress={() => console.log('Add Pressed')} 
        onProfilePress={() => console.log('Profile Pressed')} 
        showAddButton={false} 
      />
    </View>
  );
};

export default ModificarEstablecimiento;
