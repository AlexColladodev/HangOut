import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, SafeAreaView, Button, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import FondoComun from '../../components/FondoComun';
import styles from '../../styles/styles_users';
import Usuario from '../../components/Usuario';
import Preferencia from '../../components/Preferencia';
import ReviewUsuario from '../../components/ReviewUsuario';
import Actividad from '../../components/Actividad';

const DatosUsuario = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.133.133.241:5000/usuario_generico/665b56eb6bd71b0279ca391b');
      setData(response.data);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  const Modificar = () => {

  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error al cargar los datos</Text>
        <Button title="Reintentar" onPress={fetchData} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FondoComun />
        <View style={styles.dataContainer}>
          <Text style={styles.label}>Datos Usuario</Text>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: data.imagen_url }} style={styles.profileImage} />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.nombre}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre Usuario:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.nombre_usuario}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Correo Electrónico:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.email}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Teléfono:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.telefono}</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Fecha de Nacimiento:</Text>
            <View style={styles.box}>
            <Text style={styles.fieldValue}>{data.fecha_nac}</Text>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Seguidos:</Text>
            <FlatList
              data={data.seguidos}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <Usuario id={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.lista}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Preferencias:</Text>
            {data.preferencias.length > 0 ? (
              <FlatList
                data={data.preferencias}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Preferencia name={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.lista}
              />
            ) : (
              <Text style={styles.fieldValue}>N/A</Text>
            )}
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Actividades Creadas:</Text>
            <FlatList
              data={data.actividades_creadas}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <Actividad actividadId={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.lista}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Reviews:</Text>
            <FlatList
              data={data.reviews}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <ReviewUsuario reviewId={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.lista}
            />
          </View>
          <TouchableOpacity style={styles.botonModificar} onPress={Modificar}>
            <Text style={styles.botonModificarTexto}>Modificar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
  
};

export default DatosUsuario;
