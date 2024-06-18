import React, { useState, useContext } from 'react';
import { View, TextInput, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import Fondo from '../../components/Fondo';
import { Rating } from 'react-native-ratings';
import axios from 'axios';
import commonStyles from '../../styles/commonStyles';
import inputStyles from '../../styles/inputStyles';
import BASE_URL from '../../config_ip';
import Footer from '../../components/Footer';
import { UserContext } from '../../context/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const CrearReview = ({ navigation, route }) => {
  const [mensaje, setMensaje] = useState('');
  const [calificacion, setCalificacion] = useState(0);
  const { userId, token } = useContext(UserContext);
  const { establecimientoId } = route.params;

  React.useEffect(() => {
    navigation.setOptions({
      title: 'Crear Review'
    });
  }, [navigation]);

  const handleSave = async () => {
    const fecha_creacion = new Date().toISOString();
    const reviewData = {
      mensaje,
      calificacion,
      fecha_creacion,
      id_establecimiento: establecimientoId,
    };

    try {
      const response = await axios.post(`${BASE_URL}/usuario_generico/review`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        Alert.alert('Éxito', 'Review creada con éxito');
        navigation.navigate('DatosEstablecimientoUsuario', { establecimientoId });
      } else {
        const errorMsg = response.data.error || 'Hubo un problema al crear la review';
        Alert.alert('Error', errorMsg);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'No se pudo conectar con el servidor';
      Alert.alert('Error', errorMsg);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <View style={inputStyles.inputContainer}>
            <TextInput
              placeholder="Comentario:"
              value={mensaje}
              onChangeText={setMensaje}
              style={inputStyles.input}
              maxLength={200}
              multiline={true}
              numberOfLines={4}
            />
            <Text style={commonStyles.label}>Calificación:</Text>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={40}
              showRating={false}
              startingValue={0}
              onFinishRating={(rating) => setCalificacion(rating)}
              starContainerStyle={commonStyles.starContainer}
            />
            <TouchableOpacity style={commonStyles.saveButton} onPress={handleSave}>
              <Text style={commonStyles.saveButtonText}>Guardar</Text>
              <Icon name="save" size={30} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Footer
        showAddButton={true}
        onHangoutPressUser={() => navigation.navigate('InicioUsuario')}
        onProfilePressUser={() => navigation.navigate('DatosUsuario')}
        onCreateActivity={() => navigation.navigate('CrearActividad')}
      />
    </View>
  );
};

export default CrearReview;
