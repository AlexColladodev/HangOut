import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, Button, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fondo from '../../components/Fondo';
import Evento from '../../components/Evento';
import ReviewAdmin from '../../components/ReviewAdmin';
import Oferta from '../../components/Oferta';
import Preferencia from '../../components/Preferencia';
import commonStyles from '../../styles/commonStyles';
import BASE_URL from '../../config_ip';
import Footer from '../../components/Footer';
import { AdminContext } from '../../context/AdminContext';

const DatosEstablecimiento = ({ navigation, route }) => {
  const { adminId, token } = useContext(AdminContext);
  const [data, setData] = useState(route.params.establecimiento);
  const { _id: { $oid: id } } = route.params.establecimiento;

  useEffect(() => {
    navigation.setOptions({
      title: 'Establecimiento',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('ModificarEstablecimiento', { id })}>
          <Icon name="edit" size={25} color="black" style={{ marginRight: 15 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, id]);

  const handleOferta = (id) => {
    navigation.navigate('DatosOferta', { id });
  };

  const handleEvento = (id) => {
    navigation.navigate('DatosEvento', { id });
  };

  const handleAddOferta = () => {
    navigation.navigate('CrearOferta', { id: id });
  };

  const handleAddEvento = () => {
    navigation.navigate('CrearEvento', { id: id });
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar Eliminación',
      '¿Estás seguro de que deseas eliminar este establecimiento?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            axios.delete(`${BASE_URL}/establecimientos/${id}`)
              .then(response => {
                Alert.alert('Éxito', 'Establecimiento eliminado correctamente');
                navigation.navigate('InicioAdmin', { adminId });
              })
              .catch(error => {
                console.error(error);
                Alert.alert('Error', 'No se pudo eliminar el establecimiento');
              });
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <View style={commonStyles.imageContainer}>
            <Image source={{ uri: `${BASE_URL}${data.imagen_url}` }} style={commonStyles.showImage} />
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>CIF:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{data.cif}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Nombre del Establecimiento:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{data.nombre_establecimiento}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Ambiente:</Text>
            {data.ambiente.length > 0 ? (
              <FlatList
                data={data.ambiente}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Preferencia name={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={commonStyles.lista}
              />
            ) : (
              <Text style={commonStyles.fieldValue}>N/A</Text>
            )}
          </View>

          <View style={commonStyles.sectionContainer}>
            <View style={commonStyles.sectionHeader}>
              <View style={commonStyles.sectionHeaderRow}>
                <Text style={commonStyles.sectionLabel}>Ofertas:</Text>
                <TouchableOpacity onPress={handleAddOferta}>
                  <Icon name="plus-circle" size={35} color="black" marginLeft={10} />
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={data.ofertas}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <Oferta id={item} onPress={() => handleOferta(item)} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={commonStyles.lista}
            />
          </View>

          <View style={commonStyles.sectionContainer}>
            <View style={commonStyles.sectionHeader}>
              <View style={commonStyles.sectionHeaderRow}>
                <Text style={commonStyles.sectionLabel}>Eventos:</Text>
                <TouchableOpacity onPress={handleAddEvento}>
                  <Icon name="plus-circle" size={35} color="black" marginLeft={10} />
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={data.eventos}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <Evento id={item} onPress={() => handleEvento(item)} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={commonStyles.lista}
            />
          </View>

          <View style={commonStyles.sectionContainer}>
            <Text style={commonStyles.sectionLabel}>Reviews:</Text>
            <FlatList
              data={data.reviews}
              keyExtractor={(item) => item._id.$oid}
              renderItem={({ item }) => <ReviewAdmin review={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={commonStyles.lista}
            />
          </View>
        </View>
        <TouchableOpacity style={commonStyles.deleteButton} onPress={handleDelete}>
          <Icon name="trash" size={35} color="red" />
          <Text style={commonStyles.deleteButtonText}>Eliminar Establecimiento</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer
        showAddButton={false}
        onHangoutPressAdmin={() => navigation.navigate('InicioAdmin', { adminId })}
        onProfilePressAdmin={() => navigation.navigate('DatosAdministrador', { adminId })}
      />
    </View>
  );
};

export default DatosEstablecimiento;
