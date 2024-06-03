import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';

const DEFAULT_IMAGE_URL = 'http://10.133.133.241:5000/_uploads/photos/default_no_image.png';

const Oferta = ({ id }) => {
  const [oferta, setOferta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchOferta = async () => {
    try {
      const response = await axios.get(`http://10.133.133.241:5000/ofertas/${id}`);
      const ofertaData = response.data;

      console.log('Datos de la oferta:', ofertaData);

      setOferta(ofertaData);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error('Error al cargar los datos de la oferta:', error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchOferta();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error al cargar los datos de la oferta</Text>
      </View>
    );
  }

  if (!oferta) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se encontraron datos para la oferta</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: oferta.imagen_url || DEFAULT_IMAGE_URL }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.nombre} numberOfLines={1} ellipsizeMode="tail">{oferta.nombre_oferta || 'Nombre no disponible'}</Text>
        <Text style={styles.precio}>€{oferta.precio_oferta || 'Precio no disponible'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 250, // Adjust width for horizontal display
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', // Center align the text
    width: '100%',
    marginTop: 10,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Center align the text
  },
  precio: {
    fontSize: 16,
    marginTop: 5,
    color: '#000000', // Black color for price
    fontWeight: 'bold', // Bold text for price
    textAlign: 'center', // Center align the text
    width: '100%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default Oferta;
