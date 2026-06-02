import { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { auth } from '../../firebase/config';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function login() {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                props.navigation.navigate('Home');
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    return (
        <View style={styles.container}>
            <Text>Login</Text>

            <TextInput
                style={styles.field}
                keyboardType="email-address"
                placeholder="email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />

            <TextInput
                style={styles.field}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
            />

            <Text>{error}</Text>

            <Pressable style={styles.button} onPress={() => props.navigation.navigate('Register')}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={() => props.navigation.navigate('HomeMenu')}>
                <Text style={styles.buttonText}>Login(ir al home)</Text>
            </Pressable>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 20,
    },

    field: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },

    button: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
    },

    buttonText: {
        color: '#fff',
    },
});

export default Login;