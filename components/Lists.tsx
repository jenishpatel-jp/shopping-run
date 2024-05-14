import React from 'react';
import { View, Text, StyleSheet, Platform, SectionList} from 'react-native';
import Checkbox from 'expo-checkbox';

interface ListsProps {
    shoppingList: { [key: string]: string []};
}

interface Section {
    title: string;
    data: string[];
}

const Lists: React.FC<ListsProps> = ( {shoppingList} ) => {

    const sections: Section[] = Object.keys(shoppingList).map((store) => ({
        title: store,
        data: shoppingList[store]
    }));

    return (
        <View style={styles.card} >
            <SectionList 
                sections={sections}
                renderSectionHeader={ ({section: {title} } ) => (
                    <Text style={styles.storeName} >{title}</Text>)}
                renderItem={ ({ item }) => (
                    <View style={styles.checkboxContainer} > 
                        <Checkbox 
                            style={styles.checkbox}
                            color={item ? "#F5A418": "#F5A418"}
                        />
                        <Text style={styles.checkboxText}> {item} </Text>
                    </View>                    
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>

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
    },

    checkboxText: {
        color:"#F5A418",
        fontSize: 18,
        padding: 2,
        margin: 2,
    },
})

export default Lists