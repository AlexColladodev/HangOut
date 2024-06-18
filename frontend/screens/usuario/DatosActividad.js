import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Fondo from '../../components/Fondo';
import Usuario from '../../components/Usuario';
import commonStyles from '../../styles/commonStyles';
import Footer from '../../components/Footer';
import { UserContext } from '../../context/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const DatosActividad = ({ navigation, route }) => {
  const { userId } = useContext(UserContext);
  const [data, setData] = useState(route.params.actividad);
  const { actividad } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: 'Actividad',
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          {actividad && actividad.id_usuario_creador === userId ? (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('ModificarActividad', { actividad })}>
                <Icon name="edit" size={25} color="black" style={{ marginRight: 15 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('CompartirActividad', { actividadId: actividad._id.$oid })}>
                <Icon name="share-alt" size={25} color="black" style={{ marginRight: 15 }} />
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      ),
    });
  }, [navigation, actividad, userId]);

  const formattedDate = actividad.fecha_actividad ? new Date(actividad.fecha_actividad.$date).toLocaleDateString() : '';

  const handleUsuarioPress = (usuario) => {
    navigation.navigate('DatosAmigos', { usuario });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <Fondo />
      </View>
      <ScrollView style={commonStyles.container} contentContainerStyle={commonStyles.contentContainer}>
        <View style={commonStyles.dataContainer}>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Nombre Actividad:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{actividad.nombre_actividad}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Descripción Actividad:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{actividad.descripcion_actividad}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Fecha Actividad:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{formattedDate}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Hora Actividad:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{actividad.hora_actividad}</Text>
            </View>
          </View>
          <View style={commonStyles.fieldContainer}>
            <Text style={commonStyles.fieldLabel}>Ubicación:</Text>
            <View style={commonStyles.box}>
              <Text style={commonStyles.fieldValue}>{actividad.ubicacion}</Text>
            </View>
          </View>
          <View style={commonStyles.sectionContainer}>
            <Text style={commonStyles.sectionLabel}>Participantes:</Text>
            <FlatList
              data={actividad.perfil_participantes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <Usuario data={item} onPress={() => handleUsuarioPress(item)} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={commonStyles.lista}
            />
          </View>
        </View>
      </ScrollView>
      <Footer
        showAddButton={true}
        onHangoutPressUser={() => navigation.navigate('InicioUsuario', { userId })}
        onProfilePressUser={() => navigation.navigate('DatosUsuario', { userId })}
        onCreateActivity={() => navigation.navigate('CrearActividad', { userId })}
      />
    </View>
  );
};

export default DatosActividad;
