import React from 'react'
import { ThemedView } from './ThemedView'
import { StyleSheet, TextInput } from 'react-native'

const ThemedTextInput = () => {
  return (
        <ThemedView style={styles.container}>
            <TextInput 
            
                placeholder="Enter text here"
                placeholderTextColor={'#F5A418'}
             >   
            </TextInput>
        </ThemedView>
  )
}

export default ThemedTextInput;

const styles = StyleSheet.create({
    container: {
        borderRadius: 1,
        borderWidth: 3,
        width: '80%',
        borderColor: '#F5A418',
    }

})