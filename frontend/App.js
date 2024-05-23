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

const App = () => {
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
      const response = await axios.post('http://10.133.133.241:5000/establecimientos', data);
      Alert.alert('Success', 'Establecimiento guardado exitosamente');
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al guardar el establecimiento');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Crear Establecimiento</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Nombre Establecimiento:</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />
          <Text style={styles.label}>CIF:</Text>
          <TextInput
            style={styles.input}
            value={cif}
            onChangeText={setCIF}
          />
          <Text style={styles.label}>Ambiente:</Text>
          <View style={styles.checkboxContainer}>
            {Object.keys(checkBoxState).map((key) => (
              <View key={key} style={styles.checkboxWrapper}>
                <CheckBox
                  title={`CheckBox ${key}`}
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
        <View style={styles.footer}>
          <TouchableOpacity>
            <Image source={require('./assets/etiqueta.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('./assets/etiqueta.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  checkboxWrapper: {
    width: '48%', // Ensures two checkboxes per row with some spacing
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
  },
  icon: {
    width: 50,
    height: 50
  },
});

export default App;
