import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, SafeAreaView, Button, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import FondoComun from '../../components/FondoComun';
import Establecimiento from '../../components/Establecimiento';
import commonStyles from '../../styles/stylesCommon';
import styles from '../../styles/stylesData';
import BASE_URL from '../../config_ip';

const InicioAdmin = ({ adminId = "665b57a06bd71b0279ca3925" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/administrador_establecimiento/${adminId}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [adminId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={commonStyles.centered} />;
  }

  if (error) {
    return (
      <View style={commonStyles.centered}>
        <Text style={commonStyles.errorText}>Error al cargar los datos</Text>
        <Button title="Reintentar" onPress={() => setLoading(true)} />
      </View>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <View style={commonStyles.dataContainer}>
            <FondoComun />
          </View>
        )}
        data={data.establecimientos}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <Establecimiento id={item} />}
        ListFooterComponent={() => (
          <TouchableOpacity style={styles.boton} onPress={() => console.log('Crear Establecimiento')}>
            <Text style={styles.botonTexto}>Crear Establecimiento</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default InicioAdmin;
