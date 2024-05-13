import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Store = () => {
  return (
    <View>
        <Text style={styles.text} >Store</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        color: "#F5A418",
        fontSize: 24,
    }

})

export default Store