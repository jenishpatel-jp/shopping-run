import React from 'react'
import { Text, View, StyleSheet } from 'react-native';

type FlatListItemProps = {
    storeName: string;
};

const FlatListItem = ({ storeName }: FlatListItemProps) => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>{storeName}</Text>
    </View>
  )
}

export default FlatListItem

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",
  }, 
    container: {
        flex: 1,
        margin: 10,
        alignItems: "center",
        flexDirection: "row",
  },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: '100%',
        paddingHorizontal: 20,
  },
    lightBackgroundColour: {
        backgroundColor: "#FFE4A1",
    },
    darkBackgroundColour: {
        backgroundColor: "#0A1931",
    }, 
    lightColour: {
        color: "#0A1931",
    },
    darkColour: {
        color: "#FFE4A1",
    },
    

});