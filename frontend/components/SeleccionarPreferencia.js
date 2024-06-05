import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';

const SeleccionarPreferencia = ({ ambientes, seleccionados, seleccionAmbiente, styles }) => {
  return (
    <View style={styles.tagContainer}>
      {ambientes.map((ambiente, index) => (
        <View key={index} style={styles.tagWrapper}>
          <TouchableOpacity
            style={[
              styles.tag,
              seleccionados.includes(index) ? styles.tagSelected : null,
            ]}
            onPress={() => seleccionAmbiente(index)}
          >
            <Image source={ambiente.image} style={styles.tagImage} />
          </TouchableOpacity>
          <Text style={styles.tagText}>{ambiente.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default SeleccionarPreferencia;
