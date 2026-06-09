import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { auth, db } from '../../firebase/config';
import { useEffect, useState } from 'react';


function Perfil(props) {
   const [email, setEmail] = useState('');
   const [username, setUsername] = useState('');
   const [posts, setPosts] = useState([]);
   const [loading, setLoading] = useState(true);


   useEffect(() => {
       const user = auth.currentUser;


       if (user) {
           setEmail(user.email);


           const unsubscribeUsers = db.collection('users')
               .where('email', '==', user.email)
               .onSnapshot((docs) => {
                   docs.forEach((doc) => {
                       setUsername(doc.data().username);
                   });
               });


           const unsubscribePosts = db.collection('posts')
               .where('owner', '==', user.email)
               .onSnapshot((docs) => {
                   let posteos = [];


                   docs.forEach((doc) => {
                       posteos.push({
                           id: doc.id,
                           data: doc.data()
                       });
                   });


                   db.collection('posts')
                       .where('owner', '==', user.email)
                       .orderBy('createdAt', 'desc')


                   setPosts(posteos);
                   setLoading(false);
               });


           return () => {
               unsubscribeUsers();
               unsubscribePosts();
           };
       }
   }, []);


   const logout = () => {
       auth.signOut()
           .then(() => {
               props.navigation.navigate('Login');
           })
           .catch((error) => {
               console.log('Error al cerrar la sesión', error);
           });
   };


   function renderPost({ item }) {
       return (
           <View style={styles.post}>
               <Text style={styles.postOwner}>
                   {item.data.owner}
               </Text>


               <Text style={styles.postDescription}>
                   {item.data.description}
               </Text>


               <Text style={styles.postLikes}>
                   Likes: {item.data.likes ? item.data.likes.length : 0}
               </Text>
           </View>
       );
   }


   return (
       <View style={styles.container}>
           <View style={styles.profileBox}>
               <Text style={styles.title}>Mi Perfil</Text>


               <Text style={styles.label}>Nombre:</Text>
               <Text style={styles.value}>{username}</Text>


               <Text style={styles.label}>Email:</Text>
               <Text style={styles.value}>{email}</Text>
           </View>


           <View style={styles.postsBox}>
               <Text style={styles.postsTitle}>Mis posts:</Text>


               {loading ? (
                   <Text style={styles.emptyText}>Cargando posts...</Text>
               ) : posts.length === 0 ? (
                   <Text style={styles.emptyText}>Todavía no subiste posts.</Text>
               ) : (
                   <FlatList
                       data={posts}
                       renderItem={renderPost}
                       keyExtractor={(item) => item.id}
                   />
               )}
           </View>


           <Pressable onPress={logout} style={styles.logoutButton}>
               <Text style={styles.logoutText}>Logout</Text>
           </Pressable>
       </View>
   );
}


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


   postsBox: {
       flex: 1,
       marginBottom: 25,
   },


   postsTitle: {
       fontSize: 22,
       fontWeight: 'bold',
       marginBottom: 12,
   },


   post: {
       padding: 15,
       borderWidth: 1,
       borderColor: '#ddd',
       borderRadius: 10,
       backgroundColor: '#f9f9f9',
       marginBottom: 15,
   },


   postOwner: {
       fontSize: 16,
       fontWeight: 'bold',
       marginBottom: 8,
   },


   postDescription: {
       fontSize: 15,
       marginBottom: 10,
       lineHeight: 20,
   },


   postLikes: {
       fontSize: 14,
       fontWeight: 'bold',
   },


   emptyText: {
       fontSize: 15,
       marginTop: 5,
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
});


export default Perfil;
