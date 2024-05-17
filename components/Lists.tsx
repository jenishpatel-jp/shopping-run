import React, {useState} from 'react';
import { View, Text, StyleSheet, Platform, SectionList, Pressable, TextInput} from 'react-native';
import Checkbox from 'expo-checkbox';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

interface ListsProps {
    shoppingList: { [key: string]: string []};
    deleteItem: (store: string, item: string) => void;
    updateItemName: () => void;
    editItem: (store: string, item: string) => void;
    newItemName: string;
    setNewItemName: (name: string) => void;
    indexOfItem: number|null;
    storeOfItem: string|null;
}

interface Section {
    title: string;
    data: string[];
}

const Lists: React.FC<ListsProps> = ( {
    shoppingList, 
    deleteItem, 
    updateItemName, 
    editItem, 
    newItemName, 
    setNewItemName, 
    indexOfItem,
    storeOfItem,
    } ) => {

    const sections: Section[] = Object.keys(shoppingList).map((store) => ({
        title: store,
        data: shoppingList[store]
    }));

    const [selectedItem, setSelectedItem] = useState <string|null> (null);



    return (
            <SectionList 
                sections={sections}
                renderSectionHeader={ ({section} ) => (
                    <Text style={styles.storeName} >{section.title}</Text>)}
                renderItem={ ({ item, section }) => (
                    <View style={styles.itemsContainer} >
                    
                    {storeOfItem === section.title && indexOfItem === shoppingList[section.title].indexOf(item) ? (
                        <TextInput 
                            style={styles.editTextInput}
                            value={newItemName}
                            onChangeText={setNewItemName}
                        />
                    ):(
                    <View style={styles.checkboxContainer} > 
                        <Checkbox 
                            style={styles.checkbox}
                            color={selectedItem === item ? "#F5A418": "#F5A418"}
                            value={selectedItem === item}
                            onValueChange={() => setSelectedItem(item)}
                        />
                        <Text style={styles.checkboxText}> {item} </Text>
                    </View>
                    ) }
                    
                    <View style={styles.updateView} >

                    {storeOfItem === section.title && indexOfItem === shoppingList[section.title].indexOf(item) ?(
                        <Pressable onPress={updateItemName}>
                            <Text style={styles.buttonText} >Update</Text>
                        </Pressable>
                    ):
                    (
                        <Pressable
                        onPress={() => editItem(section.title, item) }  
                        >
                            <Feather style={styles.edit} name="edit" size={26} color="#F5A418" />
                        </Pressable>
                    )
                    }
                        <Pressable 
                        onPress={() => deleteItem(section.title, item)}
                        >
                            <MaterialIcons style={styles.delete}  name="delete-outline" size={30} color="#F5A418" />
                        </Pressable>
                    </View>
                    </View>            
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }; 

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
    item: {
        color: "#F5A418",
        fontSize: 18,
        padding: 2,

    },

    storeName: {
        color: "#F5A418",
        fontSize: 24,
        fontWeight: "bold",
        padding: 2,
        margin: 2,
    },

    checkboxContainer: {
        flexDirection: "row",
        margin: 2,
    },

    checkbox: {
        marginTop: 7,
        padding: 2,
        marginLeft: 10,
    },

    checkboxText: {
        color:"#F5A418",
        fontSize: 18,
        padding: 2,
        margin: 2,
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

    updateView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginRight: 10,
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

    itemsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 1,
    },

    buttonText: {
        color:"#F5A418",
        fontSize: 18,
        borderColor: "#F5A418",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 20, 
        paddingVertical: 6,

    }
})

export default Lists