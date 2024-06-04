import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Button, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import FondoComun from '../../components/FondoComun';
import styles from '../../styles/styles_data';
import Usuario from '../../components/Usuario';

const DatosActividad = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.133.133.241:5000/actividades/665b5a566bd71b0279ca3933');
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

  const formattedDate = new Date(data.fecha_actividad.$date).toLocaleDateString();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Datos Actividad</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre Actividad:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.nombre_actividad}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Descripción Actividad:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.descripcion_actividad}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Fecha Actividad:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{formattedDate}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Hora Actividad:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.hora_actividad}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Ubicación:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.ubicacion}</Text>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Participantes:</Text>
            <FlatList
              data={data.participantes}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <Usuario id={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.lista}
            />
          </View>
          <TouchableOpacity style={styles.boton} onPress={Modificar}>
            <Text style={styles.botonTexto}>Modificar</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
    </View>
  );
};



export default DatosActividad;
