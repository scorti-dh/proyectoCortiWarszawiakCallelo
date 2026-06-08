import { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { auth, db } from '../../firebase/config';

function Register(props) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function register(email, password, username) {
    auth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        db.collection('users').add({
          email: email,
          username: username,
          createdAt: Date.now(),
        })
        .then(() => {
          props.navigation.navigate('Login');
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  useEffect(
    () => {
        auth.onAuthStateChanged(
            username=>{
                if(username) {
                    props.navigation.navigate("HomeMenu")
                }
            }
        )
    }, []
  )

  return (
    <View style={styles.container}>
      <View style={styles.registerBox}>
        <Text style={styles.title}>Crear cuenta</Text>

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.field}
          keyboardType="email-address"
          placeholder="Ingresá tu email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <Text style={styles.label}>Nombre de usuario:</Text>
        <TextInput
          style={styles.field}
          placeholder="Ingresá tu username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />

        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.field}
          placeholder="Ingresá tu contraseña"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        <Text>{error}</Text>

        <Pressable
          style={styles.button}
          onPress={() => register(email, password, username)}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </Pressable>

        <Pressable
          onPress={() => props.navigation.navigate('Login')}
          style={styles.loginLink}
        >
          <Text style={styles.loginText}>
            ¿Ya tenés cuenta? Iniciá sesión
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  registerBox: {
    marginTop: 25,
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

  field: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#fff',
  },

  button: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  loginLink: {
    marginTop: 15,
    alignItems: 'center',
  },

  loginText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
   error: {
    color: '#dc3545',
    fontWeight: 'bold',
    marginBottom: 10,
  }
});

export default Register;