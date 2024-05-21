import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import FondoComun from '../../components/FondoComun';

const RegistrarseComun = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [isAccountTypeValid, setIsAccountTypeValid] = useState(true);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const handleSubmit = () => {
    if (accountType === "") {
      setIsAccountTypeValid(false);
    } else {
      setIsAccountTypeValid(true);
      // Handle form submission
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <View style={styles.inputContainer}>
          <TextInput placeholder="Nombre" style={styles.input} />
          <TextInput placeholder="Nombre Usuario" style={styles.input} />
          <TextInput placeholder="Contraseña" secureTextEntry={true} style={styles.input} />
          <TextInput placeholder="Correo Electrónico" keyboardType="email-address" style={styles.input} />
          <TextInput placeholder="Teléfono" keyboardType="phone-pad" style={styles.input} />

          <View style={styles.datePickerContainer}>
            <Text style={styles.pickerLabel}>Fecha de Nacimiento</Text>
            <View style={styles.dateRow}>
              <TextInput 
                value={date.getDate().toString()} 
                style={[styles.dateInput, styles.datePart]} 
                editable={false} 
              />
              <TextInput 
                value={date.toLocaleString('default', { month: 'short' })} 
                style={[styles.dateInput, styles.datePart]} 
                editable={false} 
              />
              <TextInput 
                value={date.getFullYear().toString()} 
                style={[styles.dateInput, styles.datePart]} 
                editable={false} 
              />
              <Button onPress={showDatepicker} title="Cambiar" color="#FF5252" />
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChangeDate}
              />
            )}
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Tipo de Cuenta</Text>
            <Picker
              selectedValue={accountType}
              onValueChange={(itemValue, itemIndex) =>
                setAccountType(itemValue)
              }
              style={isAccountTypeValid ? {} : { borderColor: 'red', borderWidth: 1 }}
            >
              <Picker.Item label="Seleccione una opción..." value="" />
              <Picker.Item label="Usuario" value="Usuario" />
              <Picker.Item label="Administrador de Establecimiento" value="Administrador de Establecimiento" />
            </Picker>
            {!isAccountTypeValid && <Text style={styles.errorText}>Seleccione un tipo de cuenta válido.</Text>}
          </View>
        </View>
        <Button title="Siguiente" color="#FF5252" onPress={handleSubmit} />
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
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    marginTop: 100,
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
  pickerContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  pickerLabel: {
    padding: 10,
    color: '#000'
  },
  errorText: {
    color: 'red',
    paddingLeft: 10,
  },
});

export default RegistrarseComun;
