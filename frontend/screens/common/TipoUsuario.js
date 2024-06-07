import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import Fondo from '../../components/Fondo';
import ambientes from '../../components/Ambientes'
import SeleccionarPreferencia from '../../components/SeleccionarPreferencia';
import styles from '../../styles/stylesTipoUsuario';
import commonStyles from '../../styles/stylesCommon';
import Header from '../../components/Header'

const TipoUsuario = () => {
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
    <Header titulo="Registro Usuario" onBackPress={() => (navigation.goBack())} />
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
      <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: -1 }}>
        <Fondo />
      </View>
        <View style={commonStyles.dataContainer}>
          <Text style={styles.preferencesTitle}>Preferencias:</Text>
          <SeleccionarPreferencia 
            ambientes={ambientes}
            seleccionados={ambientesSeleccionados}
            seleccionAmbiente={seleccionAmbiente}
            styles={styles}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TipoUsuario;
