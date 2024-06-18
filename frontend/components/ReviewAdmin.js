import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ReviewAdmin = ({ review }) => {
    if (!review) {
        return <Text>Loading...</Text>;
    }

    const formattedDate = format(new Date(review.fecha_creacion), 'dd \'de\' MMMM \'de\' yyyy', { locale: es });

    return (
        <View style={styles.container}>
            <Text style={styles.establecimiento}>{review.nombre_establecimiento}</Text>
            <Text style={styles.userName}>{review.nombre_usuario}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingLabel}>Calificación:</Text>
                <Text style={styles.ratingValue}>{review.calificacion}</Text>
            </View>
            <Text style={styles.message}>{review.mensaje}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 300,
        padding: 20,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    establecimiento: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        color: '#666',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingLabel: {
        fontSize: 14,
        color: '#000',
    },
    ratingValue: {
        fontSize: 14,
        color: '#f39c12',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    message: {
        fontSize: 14,
        color: '#333',
        marginTop: 10,
    },
});

export default ReviewAdmin;
