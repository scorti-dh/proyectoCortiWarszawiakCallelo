import { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { auth, db} from '../../firebase/config';


function Register(props) {
 const [email, setEmail] = useState('');
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

 
function register(email, password, username) {
 auth.createUserWithEmailAndPassword(email, password)
   .then((response) => {
     db.collection('users').add({
       email: email,
       username: username,
       createdAt: Date.now(),
     });
   })
   .catch((error) => console.log(error));
}


 return (
   <View style={styles.container}>
     <Text>Register</Text>


     <TextInput
       style={styles.field}
       keyboardType="email-address"
       placeholder="email"
       onChangeText={(text) => setEmail(text)}
       value={email}
     />


     <TextInput
       style={styles.field}
       placeholder="username"
       onChangeText={(text) => setUsername(text)}
       value={username}
     />


     <TextInput
       style={styles.field}
       placeholder="password"
       secureTextEntry={true}
       onChangeText={(text) => setPassword(text)}
       value={password}
     />


     <Pressable style={styles.button} onPress={() => register(email, password, username)}>
       <Text style={styles.buttonText}>Login</Text>
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
   borderColor: '#28a745',
 },


 buttonText: {
   color: '#fff',
 },
});


export default Register;

