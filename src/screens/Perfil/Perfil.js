import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { auth, db } from '../../firebase/config'
import Post from '../../components/Post/Post.js'
import { useEffect, useState } from 'react';

function Perfil() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const posts = '';

    useEffect(() => {
        const user = auth.currentUser

        if (user) {
            setEmail(user.email)

         db.collection('users')
        .where('email', '==', user.email)
        .onSnapshot((docs) => {
          docs.forEach((doc) => {
            setUsername(doc.data().username);
          });
        });
    }
  }, []);

    const logout = () => {
        auth.signOut()
            .then(() => {
                navigation.navigate('Login')
            })
            .catch((error) => {
                console.log('Error al cerrar la sesion', error);

            })
    };


    return (
        <View style={styles.container}>
            <View style={styles.profileBox}>
                <Text style={styles.title}>Mi Perfil</Text>

                <Text style={styles.label}>Nombre:</Text>
                <Text style={styles.value}>{username}</Text>

                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{email}</Text>
            </View>

            <View style={styles.postBox}>
                <Text style={styles.postsTitle}>Posts:</Text>

                <Post />
            </View>

            <Pressable onPress={logout} style={styles.logoutButton}>
                <Text styles={styles.logoutText}>Logout</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: '#fff',
        },

        profileBox: {
            marginBottom: 25,
            padding: 15,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 10,
            backgroundColor: '#f9f9f9',
        },

        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
        },

        label: {
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 4,
        },

        value: {
            fontSize: 16,
            marginBottom: 8,
        },

        email: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 8,
        },

        postsBox: {
            marginBottom: 25,
        },

        postsTitle: {
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 12,
        },

        postsList: {
            gap: 10,
        },

        logoutButton: {
            backgroundColor: '#28a745',
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 10,
        },

        logoutText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
        }
    })

export default Perfil