import React from 'react'
import { View, Text, StyleSheet, Platform, TextInput, Pressable } from 'react-native'
import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

interface ItemsProps {
    storeList: string [];
    addItem: (store: string, item: string) => void;
    editStore: (storeIndex: number) => void;
    deleteStore: (storeIndex: number) => void;
    updateStoreName: () => void;
    editingStoreIndex: number | null;
    newStoreName: string;
    setNewStoreName: (name: string) => void;
}

const Items: React.FC<ItemsProps> = ( {storeList, addItem, editStore, deleteStore, updateStoreName, editingStoreIndex, newStoreName, setNewStoreName} ) => {

    const [buttonPressed, setButtonPressed] = useState(false);
    const [selectedStore, setSelectedStore] = useState <string | null > (null);
    const [itemName, setItemName] = useState<string>("");

    const handleAddItem = () => {
        if (selectedStore && itemName) {
            addItem(selectedStore, itemName);
            setItemName("");
        }
    }

    const selectStoreFunction = (store: string) => {
        if (!selectedStore){
            setSelectedStore(store)
        } else {
            setSelectedStore(null);
        }
    }

    return (

        <View style={styles.card} >

            <TextInput 
            placeholder='Enter Item'
            placeholderTextColor={"#F5A418"}
            style={styles.textInput}
            textAlign='center'
            value={itemName}
            onChangeText={setItemName}
            />

            {storeList.map( (store, index) => (
            <View key={index} style={styles.storeContainer} >

            {editingStoreIndex === index ? (
                <TextInput
                    style={styles.editTextInput}
                    value={newStoreName}
                    onChangeText={setNewStoreName}
                    />
                ): (
            <View style={styles.checkboxContainer} >
                <Checkbox 
                    style={styles.checkbox} 
                    value={selectedStore === store}
                    onValueChange={() => selectStoreFunction(store) }
                    color={selectedStore === store ? "#F5A418": "#F5A418"}
                    />
                <Text style={styles.checkboxText} >{store}</Text>
            </View>
                )}
            
            <View style={styles.updateView} >

                {editingStoreIndex === index ? (
                <Pressable onPress={updateStoreName} >
                    <Text style={styles.buttonText} >Update</Text>
                </Pressable>

                ):(
                    
                <Pressable
                    onPress={() => editStore(index)}
                >
                    <Feather style={styles.edit} name="edit" size={26} color="#F5A418" />
                </Pressable>
                )}
                
                <Pressable
                onPress={() => deleteStore(index) }
                >
                    <MaterialIcons style={styles.delete}  name="delete-outline" size={30} color="#F5A418" />
                </Pressable>
            </View>
            </View>
            )
            )}


            <View style={styles.addButtonContainer} >
                    <Pressable
                    onPress={
                    handleAddItem
                    }
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
        justifyContent: 'center',
        paddingTop: 5,
        marginTop: 4,
        marginBottom: 1,
    }, 

    editTextInput: {
        color:"#F5A418",
        fontSize: 18,
        backgroundColor: "#5200A3",
        borderColor: "#F5A418",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop:8,
        marginRight:10,
        flex: 1,
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

    checkboxContainer: {
        flexDirection: "row",
        margin: 2,
        flex: 1,
        alignItems: "flex-end",
    },

    checkboxText: {
        color:"#F5A418",
        fontSize: 20,
        padding: 2,
        margin: 2,
        textAlignVertical: 'bottom'
    },

    storeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginVertical: 1,

    },

    updateView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        
    },

    edit: {
        marginVertical: 6,
        padding: 2,
        alignItems: "center",
        marginRight: 5,

    },

    delete: {
        marginVertical: 5,
        padding: 2,
        alignItems: "center"

    },

    checkbox: {
        marginTop: 11,
        marginHorizontal: 4,
        alignItems: "flex-end",
        marginBottom: 7,
    }

});

export default Items;