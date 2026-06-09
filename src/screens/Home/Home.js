import { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

function Home(props) {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot((docs) => {

                let posteos = [];

                docs.forEach((doc) => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });

                setPosts(posteos);
                setLoading(false);

            });

        return () => unsubscribe();

    }, []);

    function like(idDocumento) {

        db.collection('posts')
            .doc(idDocumento)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(
                    auth.currentUser.email
                )
            });

    }

    function dislike(idDocumento) {

        db.collection('posts')
            .doc(idDocumento)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(
                    auth.currentUser.email
                )
            });

    }

    function renderPost({ item }) {

        const likes = item.data.likes ? item.data.likes : [];
        const leGusto = likes.includes(auth.currentUser.email);

        return (
            <View style={styles.post}>

                <Text style={styles.owner}>
                    {item.data.owner}
                </Text>

                <Text style={styles.description}>
                    {item.data.description}
                </Text>

                <Text style={styles.likes}>
                    Likes: {likes.length}
                </Text>

                <View style={styles.buttonsContainer}>




                    <View style={styles.likeButtonsContainer}>


                        <Pressable
                            style={leGusto ? styles.dislikeButton : styles.button}
                            onPress={() => leGusto ? dislike(item.id) : like(item.id)}
                        >
                            <Text style={leGusto ? styles.dislikeText : styles.buttonText}>
                                {leGusto ? 'Quitar me gusta' : 'Me gusta'}
                            </Text>
                        </Pressable>


                    </View>
                    
                    <Pressable
                        style={styles.commentButton}
                        onPress={() =>
                            props.navigation.navigate('Comentarios', { id: item.id })
                        }
                    >
                        <Text style={styles.buttonText}>Comentar 💬</Text>
                    </Pressable>
                    
                </View>
            
            </View>
        );
    }


    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={style.loadingText}>Cargando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Home
            </Text>

            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id}
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

    post: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        marginBottom: 15,
    },

    owner: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    description: {
        fontSize: 15,
        marginBottom: 10,
        lineHeight: 20,
    },

    likes: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    buttonsContainer: {
        marginTop: 5,
    },

    likeButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 10,
    },

    button: {
        flex: 1,
        backgroundColor: '#28a745',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
    },

    buttonDos: {
        flex: 1,
        backgroundColor: '#901954',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
    },

    commentButton: {
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

    dislikeButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#dc3545',
        backgroundColor: '#fff',
    },

    dislikeText: {
        color: '#dc3545',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 25,
    }
});

export default Home;


