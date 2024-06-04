import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import FondoComun from '../../components/FondoComun';

const TipoUsuario = () => {
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
  

  const [ambientesSeleccionados, setAmbientesSeleccionados] = useState([]);

  const seleccionAmbiente = index => {
    if (ambientesSeleccionados.includes(index)) {
      setAmbientesSeleccionados(ambientesSeleccionados.filter(ambiente => ambiente !== index));
    } else {
      setAmbientesSeleccionados([...ambientesSeleccionados, index]);
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
            {ambientes.map((ambiente, index) => (
              <View key={index} style={styles.tagWrapper}>
                <TouchableOpacity style={[styles.tag, ambientesSeleccionados.includes(index) ? styles.tagSelected : null,]} onPress={() => seleccionAmbiente(index)}>
                <Image source={ambiente.image} style={styles.tagImage}/>
                </TouchableOpacity>
                <Text style={styles.tagText}>{ambiente.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
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
    width: '100%',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  preferencesTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: 20,
  },
  tagWrapper: {
    alignItems: 'center',
    marginVertical: 10, 
    width: '30%', 
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
    bottom: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    width: '35%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TipoUsuario;
