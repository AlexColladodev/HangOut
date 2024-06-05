import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert, Button, Image } from 'react-native';
import axios from 'axios';
import FondoComun from '../../components/FondoComun';
import styles from '../../styles/stylesModify';
import commonStyles from '../../styles/stylesCommon'
import BASE_URL from '../../config_ip';

const ModificarOferta = () => {
  const [data, setData] = useState({
    nombre_oferta: '',
    descripcion_oferta: '',
    precio_oferta: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/ofertas/665e0cf7e7479afa974873c0`)
      .then(response => {
        const fetchedData = response.data;
        setData({
          ...fetchedData,
          precio_oferta: fetchedData.precio_oferta.toString(),
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

  const handleSubmit = () => {
    const { nombre_oferta, descripcion_oferta, precio_oferta } = data;
    const updatedData = {
      nombre_oferta,
      descripcion_oferta,
      precio_oferta: parseFloat(precio_oferta), // Convert to number
    };

    axios.put(`${BASE_URL}/ofertas/665e0cf7e7479afa974873c0`, updatedData)
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
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <FondoComun />
        <View style={commonStyles.dataContainer}>
          <Text style={commonStyles.label}>Modificar Datos Oferta</Text>
          <View style={styles.imagenContainer}>
            <Image source={{ uri: data.imagen_url }} style={styles.imagen} />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre Oferta:</Text>
            <TextInput
              style={styles.input}
              value={data.nombre_oferta}
              onChangeText={(value) => handleInputChange('nombre_oferta', value)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Descripción Oferta:</Text>
            <TextInput
              style={styles.input}
              value={data.descripcion_oferta}
              onChangeText={(value) => handleInputChange('descripcion_oferta', value)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Precio Oferta:</Text>
            <TextInput
              style={styles.input}
              value={data.precio_oferta}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange('precio_oferta', value)}
            />
          </View>
          <TouchableOpacity style={styles.modifyButton} onPress={handleSubmit}>
            <Text style={styles.modifyButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ModificarOferta;
