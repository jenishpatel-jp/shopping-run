import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, SafeAreaView, Pressable, Platform } from 'react-native'

const Store = () => {

    const [storeName, setStoreName] = useState("");

    return (
            <SafeAreaView style= {styles.card} >
                <TextInput 
                style={styles.textInput}
                placeholder='Enter store name...'
                placeholderTextColor={"#F5A418"}
                textAlign='center'
                >
                </TextInput>
                <View style={styles.addButtonContainer} >
                    <Pressable
                    onPress={() => console.log("Add button has been pressed")}
                    >
                        <Text style={styles.button}>
                            Add
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>

    )
    }

    const styles = StyleSheet.create({
        card: {
            borderColor: "#F5A418",
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            top: 100,
            margin: 10,
            ...Platform.select({
                ios: {
                    shadowOffset: {width: 2, height: 2},
                    shadowColor: "black",
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                },
                android: {
                    elevation: 5,
                }
            })
        },
        
        text: {
            color: "#F5A418",
            fontSize: 24,
        },

        textInput: {
            color:"#F5A418",
            fontSize: 18,
            backgroundColor: "#5200A3",
            borderColor: "#F5A418",
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
        },

        addButtonContainer: {
            alignItems:'flex-end',
            justifyContent: 'flex-end',
            paddingTop: 5,
            marginTop: 4,
            marginBottom: 1,
        }, 

        button:{
            color:"#F5A418",
            fontSize: 18,
            borderColor: "#F5A418",
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 20, 
            paddingVertical: 6,

        }
    });

export default Store