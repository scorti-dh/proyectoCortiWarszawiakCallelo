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
        props.navigation.navigate('HomeMenu');
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>Iniciar sesión</Text>

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.field}
          keyboardType="email-address"
          placeholder="Ingresá tu email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.field}
          placeholder="Ingresá tu contraseña"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        {error !== '' ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}

        <Pressable style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable 
          onPress={() => props.navigation.navigate('Register')}
          style={styles.registerLink}
        >
          <Text style={styles.registerText}>
            ¿No tenés cuenta? Registrate
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

  loginBox: {
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

  error: {
    color: '#dc3545',
    fontWeight: 'bold',
    marginBottom: 10,
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

  registerLink: {
    marginTop: 15,
    alignItems: 'center',
  },

  registerText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Login;