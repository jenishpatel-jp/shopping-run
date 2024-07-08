import React from 'react'
import { View, Pressable, Text } from 'react-native';
import { styles } from './resetButtonStyles';


function ResetButton() {
  return (
    <View style={styles.addButtonContainer} >
        <Pressable>
            <Text style={styles.buttonText}>
                Reset
            </Text>
        </Pressable>
    </View> 
  )
}

export default ResetButton;