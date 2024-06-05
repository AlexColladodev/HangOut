import React, { useState } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import FondoComun from '../../components/FondoComun';
import { Rating } from 'react-native-ratings';
import axios from 'axios';
import styles from '../../styles/stylesCreate';
import commonStyles from '../../styles/stylesCommon';
import BASE_URL from '../../config_ip';

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

    axios.post(`${BASE_URL}/reviews`, reviewData)
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
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <FondoComun />
        <View style={commonStyles.dataContainer}>
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
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </View>
  );
};


export default CrearReview;
