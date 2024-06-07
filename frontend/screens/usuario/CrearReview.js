import React, { useState } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import Fondo from '../../components/Fondo';
import { Rating } from 'react-native-ratings';
import axios from 'axios';
import styles from '../../styles/stylesCreate';
import commonStyles from '../../styles/stylesCommon';
import BASE_URL from '../../config_ip';
import Header from '../../components/Header'

const CrearReview = () => {
  const [mensaje, setMensaje] = useState('');
  const [calificacion, setCalificacion] = useState(0);

  const handleSave = () => {
  };

  return (
    <View style={{ flex: 1 }}>
    <Header titulo="Crear Review" onBackPress={() => (navigation.goBack())} />
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
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
            <TouchableOpacity style={styles.boton} onPress={handleSave}>
              <Text style={styles.botonTexto}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CrearReview;
