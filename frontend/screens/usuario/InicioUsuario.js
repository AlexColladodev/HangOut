import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import FondoComun from '../../components/FondoComun';
import Establecimiento from '../../components/Establecimiento';
import Evento from '../../components/Evento';
import Actividad from '../../components/Actividad';
import ambientes from '../../components/Ambientes';
import styles from '../../styles/stylesInicioUsuario';
import commonStyles from '../../styles/stylesCommon';
import BASE_URL from '../../config_ip';


const InicioUsuario = ({ id_usuario }) => {
  const [establecimientos, setEstablecimientos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [filteredEstablecimientos, setFilteredEstablecimientos] = useState([]);
  const [selectedAmbientes, setSelectedAmbientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstablecimientos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/establecimientos/ordenados`);
        setEstablecimientos(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchEventos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/eventos/ordenados`);
        setEventos(response.data.eventos_ordenados);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchActividades = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/actividades/participa/665b56ff6bd71b0279ca391c`);
        setActividades(response.data.actividades);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchEstablecimientos(), fetchEventos(), fetchActividades()]);
      setLoading(false);
    };

    fetchData();
  }, [id_usuario]);

  const handleSelectAmbiente = async (index) => {
    let updatedSelectedAmbientes = [...selectedAmbientes];
    if (updatedSelectedAmbientes.includes(index)) {
      updatedSelectedAmbientes = updatedSelectedAmbientes.filter(i => i !== index);
    } else {
      updatedSelectedAmbientes.push(index);
    }
    setSelectedAmbientes(updatedSelectedAmbientes);

    const selectedAmbienteNames = updatedSelectedAmbientes.map(i => ambientes[i].name);

    let url = `${BASE_URL}/establecimientos/filtrar`;
    if (selectedAmbienteNames.length > 0) {
      const queryString = selectedAmbienteNames.map(amb => `ambiente=${encodeURIComponent(amb)}`).join('&');
      url += `?${queryString}`;
    }

    try {
      const response = await axios.get(url);
      setFilteredEstablecimientos(response.data.establecimientos);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={commonStyles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <FondoComun />
        <View style={commonStyles.dataContainer}>
          <Text style={styles.title}>Establecimientos</Text>
          <View style={styles.horizontalListContainer}>
            <FlatList
              data={establecimientos}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <Establecimiento id={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <Text style={styles.label}>Ambientes</Text>
          <View style={styles.horizontalListContainer}>
            <FlatList
              data={ambientes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.tagWrapper}>
                  <TouchableOpacity
                    style={[
                      styles.tag,
                      selectedAmbientes.includes(index) ? styles.tagSelected : null,
                    ]}
                    onPress={() => handleSelectAmbiente(index)}
                  >
                    <Image source={item.image} style={styles.tagImage} />
                  </TouchableOpacity>
                  <Text style={styles.tagText}>{item.name}</Text>
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={styles.horizontalListContainer}>
            <FlatList
              data={filteredEstablecimientos}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <Establecimiento id={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <Text style={styles.label}>Eventos próximos</Text>
          <View style={styles.horizontalListContainer}>
            <FlatList
              data={eventos}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <Evento id={item} mostrarEstablecimiento={true} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.lista}
            />
          </View>

          <Text style={styles.label}>Actividades que participas</Text>
          <View style={styles.sectionContainer}>
            <FlatList
              data={actividades}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <Actividad actividadId={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.lista}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default InicioUsuario;
