import React, { useState } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import FondoComun from '../../components/FondoComun';
import { Rating } from 'react-native-ratings';
import axios from 'axios';

const CrearReview = () => {
  const [mensaje, setMensaje] = useState('');
  const [calificacion, setCalificacion] = useState(0);

  const handleSave = () => {
    const fecha_creacion = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD
    const reviewData = {
      mensaje,
      calificacion,
      fecha_creacion,
      id_usuario: "6655fb6c0de733860fff23dd",
      id_establecimiento: "664f72d5497c42eeec76db0b"
    };

    axios.post('http://10.133.133.241:5000/reviews', reviewData)
      .then(response => {
        Alert.alert('Éxito', 'Review Creada con Éxito');
        // Manejar la lógica para el éxito
      })
      .catch(error => {
        console.error('Error al crear la review:', error);
        Alert.alert('Error', 'Hubo un problema al crear la review');
        // Manejar la lógica para el error
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <Text style={styles.title}>Crear Review</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Comentario:"
            value={mensaje}
            onChangeText={setMensaje}
            style={styles.input}
            maxLength={200}
            multiline={true}
            numberOfLines={4}
          />
          <Text style={styles.label}>Calificación:</Text>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={45}
            showRating={false}
            onFinishRating={(rating) => setCalificacion(rating)}
            starContainerStyle={styles.starContainer}
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  starContainer: {
    marginVertical: 10, // Opcional: Ajusta el margen vertical si es necesario
  },
  saveButton: {
    backgroundColor: 'purple',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: '5%',
    right: '5%',
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CrearReview;
