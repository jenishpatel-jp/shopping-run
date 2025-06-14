import React from 'react'
import { ThemedView } from './ThemedView'
import { StyleSheet, TextInput } from 'react-native'

const ThemedTextInput = () => {
  return (
        <ThemedView>
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
        borderColor: '#F5A418'
    }

})