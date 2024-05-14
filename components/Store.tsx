import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Pressable, Platform } from 'react-native'

interface StoreProps {
    addStore: (storeName: string ) => void;
}

const Store: React.FC<StoreProps> = ( {addStore} ) => {

    const [storeName, setStoreName] = useState("");
    const [buttonPressed, setButtonPressed] = useState(false);
 
    return (
        <View style= {styles.card} >
            <TextInput 
                style={styles.textInput}
                placeholder='Enter store name...'
                placeholderTextColor={"#F5A418"}
                textAlign='center'
                value={storeName}
                onChangeText={setStoreName}
            />

            <View style={styles.addButtonContainer} >
                <Pressable
                onPress={() => {
                    addStore(storeName);
                    setStoreName("");
                }}


                onPressIn={() => setButtonPressed(true)}
                onPressOut={() => setButtonPressed(false)}
                style={( {pressed} ) => [
                    {
                        backgroundColor: pressed || buttonPressed ? "#5200A3" : "#40146B"
                    }
                ]}
                >
                    <Text style={styles.buttonText}>
                        Add
                    </Text>
                </Pressable>
            </View>
        </View>
    )
    }

    const styles = StyleSheet.create({

        card: {
            borderColor: "#F5A418",
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
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

        buttonText:{
            color:"#F5A418",
            fontSize: 18,
            borderColor: "#F5A418",
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 20, 
            paddingVertical: 6,
        },

    });

export default Store