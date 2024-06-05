import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import FondoComun from '../../components/FondoComun';
import ambientes from '../../components/Ambientes'
import SeleccionarPreferencia from '../../components/SeleccionarPreferencia';
import styles from '../../styles/stylesTipoUsuario';

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
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <View style={styles.dataContainer}>
            <Text style={styles.title}>Tipo de Cuenta Usuario</Text>
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
