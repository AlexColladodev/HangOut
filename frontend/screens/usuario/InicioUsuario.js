import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import FondoComun from '../../components/FondoComun';
import Establecimiento from '../../components/Establecimiento';

const InicioUsuario = () => {
  const [establecimientos, setEstablecimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEstablecimientos = async () => {
      try {
        const response = await axios.get('http://10.133.133.241:5000/establecimientos/ordenados');
        setEstablecimientos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEstablecimientos();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <View style={styles.dataContainer}>
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

            <View style={styles.dataContainer}>
            <Text style={styles.title}>Eventos</Text>
            </View>

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10, // Ajustar el margen vertical si es necesario
    textAlign: 'center', // Centrar el título si es necesario
  },
  horizontalListContainer: {
    width: '100%',
    paddingVertical: 10, // Ajustar el padding vertical si es necesario
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default InicioUsuario;
