import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, Text, Platform, Image, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import FondoComun from '../../components/FondoComun';
import styles from '../../styles/stylesTipoAdmin';

const RegistrarseComun = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [isAccountTypeValid, setIsAccountTypeValid] = useState(true);
  const [imageUri, setImageUri] = useState(null);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (accountType === "") {
      setIsAccountTypeValid(false);
    } else {
      setIsAccountTypeValid(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <View style={styles.dataContainer}>
        <Text style={styles.title}>Registro</Text> 
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

          <Button title="Seleccionar Foto de Perfil" onPress={selectImage} />
          {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        </View>
        <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
            <Text style={styles.botonTexto}>Siguiente</Text>
          </TouchableOpacity>
          </View>
      </ScrollView>
    </View>
  );
};



export default RegistrarseComun;
