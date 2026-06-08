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

        return (
            <View style={styles.post}>

                <Text>
                    {item.data.owner}
                </Text>

                <Text>
                    {item.data.description}
                </Text>

                <Text>
                    Likes: {item.data.likes.length}
                </Text>

                <Pressable onPress={() => like(item.id)}>
                    <Text>Me gusta♥️</Text>
                </Pressable>

                <Pressable onPress={() => dislike(item.id)}>
                    <Text>Quitar me gusta</Text>
                </Pressable>

                <Pressable
                    onPress={() =>
                        props.navigation.navigate('Comments', { id: item.id })
                    }
                >
                    <Text>Comentar💬</Text>
                </Pressable>

            </View>
        );
    }

    if (loading) {
        return (
            <View>
                <Text>Cargando...</Text>
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
        backgroundColor: '#f5f5f5',
        padding: 15
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333'
    },

    post: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        elevation: 4
    }

});

export default Home;