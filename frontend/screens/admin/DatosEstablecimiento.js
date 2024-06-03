import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView, Button, Image, Dimensions, FlatList } from 'react-native';
import axios from 'axios';
import FondoComun from '../../components/FondoComun';
import Evento from '../../components/Evento'; // Importa el componente Evento
import Review from '../../components/Review'; // Importa el componente Review
import Oferta from '../../components/Oferta'; // Importa el componente Oferta

const DatosEstablecimiento = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ofertas, setOfertas] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.133.133.241:5000/establecimientos/665b5df730fb9962d8d08eea');
      const establecimientoData = response.data;

      const ofertaPromises = establecimientoData.ofertas.map(async (ofertaId) => {
        const ofertaResponse = await axios.get(`http://10.133.133.241:5000/ofertas/${ofertaId}`);
        return ofertaResponse.data;
      });

      const ofertaData = await Promise.all(ofertaPromises);

      setData(establecimientoData);
      setOfertas(ofertaData);
      setLoading(false);
      setError(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(true);
    }
  };

  const handleSave = () => {
    // Implement save functionality if needed
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
          <Text style={styles.label}>Datos del Establecimiento</Text>
          <Image source={{ uri: data.imagen_url }} style={styles.profileImage} />
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>CIF:</Text>
            <Text style={styles.fieldValue}>{data.cif}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nombre del Establecimiento:</Text>
            <Text style={styles.fieldValue}>{data.nombre_establecimiento}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>ID Administrador:</Text>
            <Text style={styles.fieldValue}>{data.id_administrador}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Ambiente:</Text>
            {data.ambiente.length > 0 ? (
              data.ambiente.map((item, index) => (
                <Text key={index} style={styles.listItem}>{item}</Text>
              ))
            ) : (
              <Text style={styles.fieldValue}>No hay ambientes disponibles</Text>
            )}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Ofertas:</Text>
            <FlatList
              data={data.ofertas}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <Oferta id={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.eventList}
            />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Eventos:</Text>
            <FlatList
              data={data.eventos}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <Evento id={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.eventList}
            />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Reviews:</Text>
            <FlatList
              data={data.reviews}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <Review reviewId={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.reviewList}
            />
          </View>

          <Button title="Modificar" color="#BB6BD9" onPress={handleSave} />

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
  profileImage: {
    width: Dimensions.get('window').width - 40, // Adjust width according to screen width and padding
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  fieldContainer: {
    marginBottom: 10,
    alignItems: 'flex-start',
    width: '100%',
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fieldValue: {
    fontSize: 18,
    marginLeft: 10,
  },
  sectionContainer: {
    marginBottom: 20,
    width: '100%',
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  listItem: {
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    marginBottom: 10,
  },
  ofertaList: {
    paddingVertical: 10,
  },
  eventList: {
    paddingVertical: 10,
  },
  reviewList: {
    paddingVertical: 10,
  },
});

export default DatosEstablecimiento;
