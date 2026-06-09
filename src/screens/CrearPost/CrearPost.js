import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../../firebase/config';

function CrearPost(props) {

    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    function createPost() {

        db.collection('posts')
            .add({
                owner: auth.currentUser.email,
                description: description,
                createdAt: Date.now(),
                likes: []
            })
            .then(() => {

                setDescription('');

props.navigation.navigate('StackNav', {screen: "Home"});
            })
            .catch((error) => {

                setError(error.message);

            });

    }

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                Crear Posteo
            </Text>

            <TextInput
                style={styles.field}
                placeholder="¿Qué estás pensando?"
                keyboardType="default"
                onChangeText={(text) => setDescription(text)}
                value={description}
            />

            <Text style={styles.error}>
                {error}
            </Text>

            <Pressable
                style={styles.button}
                onPress={() => createPost()}
            >
                <Text style={styles.buttonText}>
                    Publicar
                </Text>
            </Pressable>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },

    field: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 5,
        marginBottom: 15
    },

    error: {
        color: 'red',
        marginBottom: 10
    },

    button: {
        backgroundColor: '#28a745',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center'
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }

});

export default CrearPost;