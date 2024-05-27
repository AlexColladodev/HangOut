import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert, Button, Image } from 'react-native';
import axios from 'axios';
import FondoComun from '../../components/FondoComun';

const ModificarOferta = () => {
  const [data, setData] = useState({
    nombre_oferta: '',
    descripcion_oferta: '',
    precio_oferta: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://10.133.133.241:5000/ofertas/6650bea8d0c491cc9955f392')
      .then(response => {
        const fetchedData = response.data;
        setData({
          nombre_oferta: fetchedData.nombre_oferta,
          descripcion_oferta: fetchedData.descripcion_oferta,
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

    axios.put('http://10.133.133.241:5000/ofertas/6650bea8d0c491cc9955f392', updatedData)
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
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Modificar Datos Oferta</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  dataContainer: {
    marginTop: 50,
    width: '100%',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  fieldContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
    width: '100%',
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  modifyButton: {
    backgroundColor: 'purple',
    padding: 10,
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  modifyButtonText: {
    color: 'white',
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#E0F7FA',
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default ModificarOferta;
