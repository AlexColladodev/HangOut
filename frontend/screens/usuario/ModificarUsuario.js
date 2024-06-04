import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert, Button, Platform, Image } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/es'; // Importar el locale español
import FondoComun from '../../components/FondoComun';
import styles from '../../styles/styles_mod'

const ModificarUsuario = () => {
  const [data, setData] = useState({
    nombre: '',
    nombre_usuario: '',
    email: '',
    telefono: '',
    fecha_nacimiento: new Date(),
    seguidos: [],
    preferencias: [],
    actividades_creadas: [],
    reviews: [],
  });
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const ambientes = [
    { name: "Chill", image: require("../../assets/ambiente/chill.png") },
    { name: "Monologos", image: require("../../assets/ambiente/monologos.png") },
    { name: "Cine", image: require("../../assets/ambiente/cine.png") },
    { name: "Discoteca", image: require("../../assets/ambiente/discoteca.png") },
    { name: "Bar", image: require("../../assets/ambiente/bar.png") },
    { name: "Cervezas", image: require("../../assets/ambiente/cervezas.png") },
    { name: "Rock", image: require("../../assets/ambiente/rock.png") },
    { name: "En Vivo", image: require("../../assets/ambiente/en_vivo.png") },
    { name: "Reggaeton", image: require("../../assets/ambiente/reggaeton.png") },
    { name: "Latino", image: require("../../assets/ambiente/latino.png") },
    { name: "Deportes", image: require("../../assets/ambiente/deportes.png") },
    { name: "Karaoke", image: require("../../assets/ambiente/karaoke.png") },
  ];

  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    axios.get('http://10.133.133.241:5000/usuario_generico/665b56eb6bd71b0279ca391b')
      .then(response => {
        const fetchedData = response.data;
        setData({
          ...fetchedData,
          fecha_nacimiento: new Date(fetchedData.fecha_nac),
        });
        setSelectedTags(fetchedData.preferencias.map(pref => ambientes.findIndex(amb => amb.name === pref)));
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (field, value) => {
    setData(prevState => ({ ...prevState, [field]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || data.fecha_nacimiento;
    setShowDatePicker(Platform.OS === 'ios');
    setData(prevState => ({ ...prevState, fecha_nacimiento: currentDate }));
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleSelectTag = index => {
    const newSelectedTags = selectedTags.includes(index)
      ? selectedTags.filter(tag => tag !== index)
      : [...selectedTags, index];
    setSelectedTags(newSelectedTags);
    const newPreferencias = newSelectedTags.map(tagIndex => ambientes[tagIndex].name);
    setData(prevState => ({ ...prevState, preferencias: newPreferencias }));
  };

  const handleSubmit = () => {
    const { nombre, nombre_usuario, email, telefono, seguidos, preferencias, actividades_creadas, reviews } = data;
    const updatedData = {
      nombre,
      nombre_usuario,
      email,
      telefono,
      fecha_nacimiento: data.fecha_nacimiento.toISOString().split('T')[0], // Formato YYYY-MM-DD
      seguidos,
      preferencias,
      actividades_creadas,
      reviews,
    };

    axios.put('http://10.133.133.241:5000/usuario_generico/665b56eb6bd71b0279ca391b', updatedData)
      .then(response => {
        Alert.alert('Éxito', 'Los datos han sido actualizados.');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema al actualizar los datos.');
      });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Error al cargar los datos</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Modificar Datos Usuario</Text>
          <Image source={{ uri: data.imagen_url }} style={styles.profileImage} />
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre:</Text>
            <TextInput
              style={styles.input}
              value={data.nombre}
              onChangeText={(value) => handleInputChange('nombre', value)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre Usuario:</Text>
            <TextInput
              style={styles.input}
              value={data.nombre_usuario}
              onChangeText={(value) => handleInputChange('nombre_usuario', value)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Correo Electrónico:</Text>
            <TextInput
              style={styles.input}
              value={data.email}
              onChangeText={(value) => handleInputChange('email', value)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Teléfono:</Text>
            <TextInput
              style={styles.input}
              value={data.telefono}
              onChangeText={(value) => handleInputChange('telefono', value)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Fecha de Nacimiento:</Text>
            <View style={styles.dateRow}>
              <TextInput
                value={moment(data.fecha_nacimiento).format('DD')}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <TextInput
                value={moment(data.fecha_nacimiento).format('MMMM')}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <TextInput
                value={moment(data.fecha_nacimiento).format('YYYY')}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <Button onPress={showDatepicker} title="Cambiar" color="#FF5252" />
            </View>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={data.fecha_nacimiento}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
          <Text style={styles.preferencesTitle}>Preferencias:</Text>
          <View style={styles.tagContainer}>
            {ambientes.map((ambiente, index) => (
              <View key={index} style={styles.tagWrapper}>
                <TouchableOpacity
                  style={[
                    styles.tag,
                    selectedTags.includes(index) ? styles.tagSelected : null,
                  ]}
                  onPress={() => handleSelectTag(index)}
                >
                  <Image
                    source={ambiente.image}
                    style={styles.tagImage}
                  />
                </TouchableOpacity>
                <Text style={styles.tagText}>{ambiente.name}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.modifyButton} onPress={handleSubmit}>
            <Text style={styles.modifyButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ModificarUsuario;