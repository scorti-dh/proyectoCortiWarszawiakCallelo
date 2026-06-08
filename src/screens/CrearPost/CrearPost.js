import { useState } from 'react'
import { View, Text, TextInput, Pressable, Image, StyleSheet } from 'react-native'

function CrearPost() {
    const [desc, setDesc] = useState('')
    const [img, setImg] = useState('')



    return (
        <View>
            <Text style={styles.label}>Crea tu post</Text>
            <TextInput
                      style={styles.field}
                      placeholder="Ingresa la imagen"
                      onChangeText={(text) => setUsername(text)}
                      value={username}
                    />
        </View>
    )
}

export default CrearPost