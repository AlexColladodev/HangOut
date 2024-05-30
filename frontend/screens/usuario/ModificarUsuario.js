import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Alert, Button, Platform, Image } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import FondoComun from '../../components/FondoComun';

const ModificarUsuario = () => {
  const [data, setData] = useState({
    nombre: '',
    nombre_usuario: '',
    email: '',
    telefono: '',
    fecha_nacimiento: new Date('1970-01-01'),
    seguidos: [],
    preferencias: [],
    actividades_creadas: [],
    reviews: [],
  });
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const tags = ['pop', 'bar', 'rock', 'jazz', 'hip-hop', 'clásica', 'electrónica', 'folk', 'country', 'reggae', 'blues', 'metal'];
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    axios.get('http://10.133.133.241:5000/usuario_generico/6658ad58c3940827ec7706e1')
      .then(response => {
        const fetchedData = response.data;
        setData({
          ...fetchedData,
          fecha_nacimiento: new Date('1970-01-01'), // Fecha de nacimiento estática
        });
        setSelectedTags(fetchedData.preferencias.map(pref => tags.indexOf(pref)));
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
    const newPreferencias = newSelectedTags.map(tagIndex => tags[tagIndex]);
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

    axios.put('http://10.133.133.241:5000/usuario_generico/6658ad58c3940827ec7706e1', updatedData)
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
                value={data.fecha_nacimiento.getDate().toString()}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <TextInput
                value={data.fecha_nacimiento.toLocaleString('default', { month: 'short' })}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <TextInput
                value={data.fecha_nacimiento.getFullYear().toString()}
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
            {tags.map((tag, index) => (
              <View key={index} style={styles.tagWrapper}>
                <TouchableOpacity
                  style={[
                    styles.tag,
                    selectedTags.includes(index) ? styles.tagSelected : null,
                  ]}
                  onPress={() => handleSelectTag(index)}
                >
                  <Image
                    source={require('../../assets/etiqueta.png')}
                    style={styles.tagImage}
                  />
                </TouchableOpacity>
                <Text style={styles.tagText}>{tag}</Text>
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
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  fieldContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
    width: '100%',
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    marginRight: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  datePart: {
    flex: 1,
  },
  preferencesTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-start', // Alinea el texto a la izquierda
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  tagWrapper: {
    alignItems: 'center',
    margin: 10,
  },
  tag: {
    width: 50,
    height: 50,
    opacity: 0.5,
  },
  tagSelected: {
    opacity: 1,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 10,
  },
  tagImage: {
    width: '100%',
    height: '100%',
  },
  tagText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  modifyButton: {
    backgroundColor: 'purple',
    padding: 10,
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  modifyButtonText: {
    color: 'white',
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#E0F7FA',
  },
  icon: {
    width: 50,
    height: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default ModificarUsuario;
