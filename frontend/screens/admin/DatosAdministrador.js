import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import FondoComun from '../../components/FondoComun';
import styles from '../../styles/styles_users';

const DatosAdministrador = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.133.133.241:5000/administrador_establecimiento/665b57a06bd71b0279ca3925');
      setData(response.data);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  const Modificar = () => {

  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error al cargar los datos</Text>
        <Button title="Reintentar" onPress={fetchData} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Datos Administrador Establecimiento</Text>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: data.imagen_url }} style={styles.profileImage} />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.nombre}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre Usuario:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.nombre_usuario}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Correo Electrónico:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.email_empresa}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Teléfono:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.telefono}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Fecha de Nacimiento:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.fecha_nac}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.botonModificar} onPress={Modificar}>
            <Text style={styles.botonModificarTexto}>Modificar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default DatosAdministrador;
