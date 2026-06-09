import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../../firebase/config';

function Comentarios(props) {
    const [comentarios, setComentarios] = useState([]);
    const [comentario, setComentario] = useState('');
    const [error, setError] = useState('');

    const idPost = props.route.params.id;

    useEffect(() => {
        const unsubscribe = db.collection('comments')
            .where('postId', '==', idPost)
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

        return () => unsubscribe();

    }, []);

    function agregarComentario() {
        if (comentario === '') {
            setError('El comentario no puede estar vacío');
            return;
        }

        db.collection('comments')
            .add({
                postId: idPost,
                owner: auth.currentUser.email,
                text: comentario,
                createdAt: Date.now()
            })
            .then(() => {
                setComentario('');
                setError('');
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    function renderComentario({ item }) {
        return (
            <View style={styles.comment}>
                <Text style={styles.owner}>{item.data.owner}</Text>
                <Text style={styles.commentText}>{item.data.text}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Comentarios</Text>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.field}
                    placeholder="Escribí un comentario"
                    onChangeText={(text) => setComentario(text)}
                    value={comentario}
                    multiline={true}
                />

                {
                    error !== '' ?
                        <Text style={styles.error}>{error}</Text>
                    :
                        null
                }

                <Pressable
                    style={styles.button}
                    onPress={() => agregarComentario()}
                >
                    <Text style={styles.buttonText}>Comentar</Text>
                </Pressable>
            </View>

            <Text style={styles.subtitle}>
                Comentarios del post
            </Text>

            <Text style={styles.count}>
                Cantidad: {comentarios.length}
            </Text>

            <FlatList
                data={comentarios}
                renderItem={renderComentario}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        Todavía no hay comentarios.
                    </Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    formContainer: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        marginBottom: 20,
    },

    field: {
        minHeight: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        fontSize: 15,
        marginBottom: 10,
    },

    button: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 5,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    count: {
        fontSize: 14,
        color: '#555',
        marginBottom: 12,
    },

    comment: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        marginBottom: 12,
    },

    owner: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#333',
    },

    commentText: {
        fontSize: 15,
        lineHeight: 20,
        color: '#222',
    },

    error: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },

    emptyText: {
        color: '#777',
        fontSize: 15,
        marginTop: 10,
    },
});

export default Comentarios;