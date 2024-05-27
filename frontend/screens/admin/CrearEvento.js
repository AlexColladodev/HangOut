import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FondoComun from '../../components/FondoComun';

const CrearEvento = () => {
  const [nombreEvento, setNombreEvento] = useState('');
  const [descripcionEvento, setDescripcionEvento] = useState('');
  const [fechaEvento, setFechaEvento] = useState(new Date());
  const [horaEvento, setHoraEvento] = useState(new Date());
  const [precioEvento, setPrecioEvento] = useState('');
  const [showFecha, setShowFecha] = useState(false);
  const [showHora, setShowHora] = useState(false);

  const onChangeFecha = (event, selectedDate) => {
    const currentDate = selectedDate || fechaEvento;
    setShowFecha(Platform.OS === 'ios');
    setFechaEvento(currentDate);
  };

  const onChangeHora = (event, selectedDate) => {
    const currentDate = selectedDate || horaEvento;
    setShowHora(Platform.OS === 'ios');
    setHoraEvento(currentDate);
  };

  const showDatepicker = () => {
    setShowFecha(true);
  };

  const showTimepicker = () => {
    setShowHora(true);
  };

  const handleSave = () => {
    // Manejar la lógica para guardar el evento
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <Text style={styles.title}>Crear Evento</Text> 
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nombre Evento:"
            value={nombreEvento}
            onChangeText={setNombreEvento}
            style={styles.input}
          />
          <TextInput
            placeholder="Descripción Evento:"
            value={descripcionEvento}
            onChangeText={setDescripcionEvento}
            style={styles.input}
          />
          <View style={styles.datePickerContainer}>
            <Text style={styles.pickerLabel}>Fecha Evento:</Text>
            <View style={styles.dateRow}>
              <TextInput
                value={fechaEvento.getDate().toString()}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <TextInput
                value={fechaEvento.toLocaleString('default', { month: 'short' })}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <TextInput
                value={fechaEvento.getFullYear().toString()}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <Button onPress={showDatepicker} title="Cambiar" color="#FF5252" />
            </View>
            {showFecha && (
              <DateTimePicker
                value={fechaEvento}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChangeFecha}
              />
            )}
          </View>
          <View style={styles.datePickerContainer}>
            <Text style={styles.pickerLabel}>Hora Evento:</Text>
            <View style={styles.dateRow}>
              <TextInput
                value={horaEvento.getHours().toString()}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <TextInput
                value={horaEvento.getMinutes().toString().padStart(2, '0')}
                style={[styles.dateInput, styles.datePart]}
                editable={false}
              />
              <Button onPress={showTimepicker} title="Cambiar" color="#FF5252" />
            </View>
            {showHora && (
              <DateTimePicker
                value={horaEvento}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChangeHora}
              />
            )}
          </View>
          <TextInput
            placeholder="Precio Evento:"
            value={precioEvento}
            onChangeText={text => setPrecioEvento(text.replace(/[^0-9.]/g, ''))}
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
  datePickerContainer: {
    marginBottom: 20,
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
  pickerLabel: {
    padding: 10,
    color: '#000'
  },
});

export default CrearEvento;
