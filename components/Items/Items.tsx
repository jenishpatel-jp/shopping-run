import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { styles } from './ItemStyles';
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
    };

    const selectStoreFunction = (store: string) => {
        if (!selectedStore){
            setSelectedStore(store)
        } else {
            setSelectedStore(null);
        }
    };

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
};

export default Items;