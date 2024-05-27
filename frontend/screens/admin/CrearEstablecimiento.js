import React, { useState } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import FondoComun from '../../components/FondoComun';

const CrearEstablecimiento = () => {
  const [nombre, setNombre] = useState('');
  const [cif, setCIF] = useState('');
  const [checkBoxState, setCheckBoxState] = useState({
    box1: false,
    box2: false,
    box3: false,
    box4: false,
    box5: false,
    box6: false,
  });

  const handleCheckBoxChange = (boxName) => {
    setCheckBoxState(prevState => ({
      ...prevState,
      [boxName]: !prevState[boxName],
    }));
  };

  const handleSubmit = async () => {
    const selectedCheckBoxes = Object.keys(checkBoxState).filter(key => checkBoxState[key]);
    const data = {
      nombre_establecimiento: nombre,
      cif: cif,
      ambiente: selectedCheckBoxes,
      id_administrador: '6627c9be1d5548a0cff17158'
    };

    try {
      const response = await axios.post('http://192.168.1.107:5000/establecimientos', data);
      Alert.alert('Success', 'Establecimiento guardado exitosamente');
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al guardar el establecimiento');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <View style={styles.header}>
          <Text style={styles.title}>Crear Establecimiento</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nombre Establecimiento"
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            placeholder="CIF"
            style={styles.input}
            value={cif}
            onChangeText={setCIF}
          />
          <Text style={styles.label}>Ambiente:</Text>
          <View style={styles.checkboxContainer}>
            {Object.keys(checkBoxState).map((key) => (
              <View key={key} style={styles.checkboxWrapper}>
                <CheckBoxElement
                  title={`${key}`}
                  checked={checkBoxState[key]}
                  onPress={() => handleCheckBoxChange(key)}
                  containerStyle={styles.checkbox}
                  textStyle={styles.checkboxText}
                />
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// CheckBoxElement Function Component
const CheckBoxElement = ({
  title = '',
  checked = false,
  onPress = () => {},
  containerStyle = {},
  textStyle = {},
}) => {
  return (
    <CheckBox
      title={title}
      checked={checked}
      onPress={onPress}
      containerStyle={containerStyle}
      textStyle={textStyle}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    paddingHorizontal: 20,
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
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  checkboxWrapper: {
    width: '48%',
    marginBottom: 10,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  checkboxText: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: 'purple',
    padding: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#E0F7FA',
    position: 'absolute', // Mantiene el footer fijo
    bottom: 0, // Asegura que el footer se mantenga en la parte inferior
    left: 0,
    right: 0,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default CrearEstablecimiento;
