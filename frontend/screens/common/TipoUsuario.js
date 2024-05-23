import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import FondoComun from '../../components/FondoComun';

const TipoUsuario = () => {
  const tags = Array.from({ length: 12 }, (_, index) => `Etiqueta ${index + 1}`);

  const [selectedTags, setSelectedTags] = useState([]);

  const handleSelectTag = index => {
    if (selectedTags.includes(index)) {
      setSelectedTags(selectedTags.filter(tag => tag !== index)); // Deselecciona
    } else {
      setSelectedTags([...selectedTags, index]); // Selecciona
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.logo}>Tipo de Cuenta Usuario</Text>
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
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => { /* Lógica para crear cuenta */ }}>
          <Text style={styles.buttonText}>Crear Cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Asegura que el contenedor ocupe todo el ancho
    paddingHorizontal: 20, // Añade un padding horizontal si es necesario
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Centra el texto del logo
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
  footer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20, // Posiciona el botón en la parte inferior con margen
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15, // Aumenta el padding del botón
    borderRadius: 20,
    alignItems: 'center', // Centra el texto del botón
    width: '35%', // Ajusta el ancho del botón
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TipoUsuario;
