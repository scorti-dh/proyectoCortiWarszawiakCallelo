import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../../firebase/config';

function Comentarios(props) {
    const [comentarios, setComentarios] = useState([]);
    const [comentario, setComentario] = useState('');
    const [error, setError] = useState('');

    const idPost = props.route.params.id;

    useEffect(() => {
        db.collection('comments')
            .where('postId', '==', idPost)
            .orderBy('createdAt', 'desc')
            .onSnapshot((docs) => {
                let comentariosArray = [];

                docs.forEach((doc) => {
                    comentariosArray.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });

                setComentarios(comentariosArray);
            });
    }, []);

    function agregarComentario() {
        db.collection('comments')
            .add({
                postId: idPost,
                owner: auth.currentUser.email,
                text: comentario,
                createdAt: Date.now()
            })
            .then(() => {
                setComentario('');
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    function renderComentario({ item }) {
        return (
            <View style={styles.comment}>
                <Text>{item.data.owner}</Text>
                <Text>{item.data.text}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Comentarios</Text>

            <TextInput
                style={styles.field}
                placeholder="Escribí un comentario"
                onChangeText={(text) => setComentario(text)}
                value={comentario}
            />

            <Text>{error}</Text>

            <Pressable
                style={styles.button}
                onPress={() => agregarComentario()}
            >
                <Text style={styles.buttonText}>Comentar</Text>
            </Pressable>

            <FlatList
                data={comentarios}
                renderItem={renderComentario}
                keyExtractor={(item) => item.id}
            />
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
        marginBottom: 20
    },

    field: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10
    },

    button: {
        backgroundColor: '#28a745',
        padding: 10,
        alignItems: 'center',
        marginBottom: 20
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },

    comment: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10
    }
});

export default Comentarios;