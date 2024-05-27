import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, Text } from 'react-native';
import FondoComun from '../../components/FondoComun';

const CrearOferta = () => {
  const [nombreOferta, setNombreOferta] = useState('');
  const [descripcionOferta, setDescripcionOferta] = useState('');
  const [precioOferta, setPrecioOferta] = useState('');

  const handleSave = () => {
    // Manejar la lógica para guardar la oferta
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <Text style={styles.title}>Crear Oferta</Text> 
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nombre Oferta:"
            value={nombreOferta}
            onChangeText={setNombreOferta}
            style={styles.input}
          />
          <TextInput
            placeholder="Descripción Oferta:"
            value={descripcionOferta}
            onChangeText={setDescripcionOferta}
            style={styles.input}
          />
          <TextInput
            placeholder="Precio Oferta:"
            value={precioOferta}
            onChangeText={text => setPrecioOferta(text.replace(/[^0-9.]/g, ''))}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <Button title="Guardar" color="#BB6BD9" onPress={handleSave} />
      </ScrollView>
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
  },
});

export default CrearOferta;
