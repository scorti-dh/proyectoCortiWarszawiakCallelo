import { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

function Home(props) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

    db.collection('posts')
        .onSnapshot((docs) => {

            console.log('Snapshot recibido');
            console.log(docs);

            let posteos = [];

            docs.forEach((doc) => {

                console.log('Documento:', doc.id);
                console.log(doc.data());

                posteos.push({
                    id: doc.id,
                    data: doc.data()
                });

            });

            console.log('Posts cargados:', posteos);

            setPosts(posteos);

        });

}, []);

    function like(idDocumento) {

        db.collection('posts')
            .doc(idDocumento)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(
                    auth.currentUser.email
                )
            })
            .catch((error) => console.log(error));
    }

    function dislike(idDocumento) {

        db.collection('posts')
            .doc(idDocumento)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(
                    auth.currentUser.email
                )
            })
            .catch((error) => console.log(error));
    }
    return (

        <View>

            <Text>Home</Text>

            {
                posts.map((post) => (

                    <View key={post.id}>

                        <Text>
                            {post.data.username || post.data.owner}
                        </Text>

                        <Text>
                            {post.data.description}
                        </Text>

                        <Text>
                            Likes:
                            {
                                post.data.likes
                                    ? post.data.likes.length
                                    : 0
                            }
                        </Text>

                        <Pressable
                            onPress={() => like(post.id)}
                        >
                            <Text>Me gusta</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => dislike(post.id)}
                        >
                            <Text>Quitar me gusta</Text>
                        </Pressable>

                        <Pressable
                            onPress={() =>
                                props.navigation.navigate(
                                    'Comments',
                                    { id: post.id }
                                )
                            }
                        >
                            <Text>Comentar</Text>
                        </Pressable>

                    </View>

                ))
            }

        </View>

    );
}

export default Home;