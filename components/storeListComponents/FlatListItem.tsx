import React, { use } from 'react'
import { Text, View, StyleSheet, useColorScheme, Share } from 'react-native';

import { useSQLiteContext } from 'expo-sqlite';



//React Native Gesture Handler and Animated
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

// Icons
import Feather from '@expo/vector-icons/Feather';
import { useStoreDatabase } from '../../lib/store';
import { state$ } from '../../lib/state';

type FlatListItemProps = {
    storeName: string;
    storeId: number;   
};

// Right action for swipe to delete
const RightAction = ( prog: SharedValue<number>, drag: SharedValue<number> ) => {

    const styleAnimation = useAnimatedStyle(() => {
        return {
        transform: [{ translateX: drag.value + 50 }]
        }
    });

    return (
        <Reanimated.View style={styleAnimation}>
            <View style={styles.action}>
                <Feather name="trash-2" size={24} color="#FFE4A1" />
            </View>
        </Reanimated.View>
    );
};

// Left action for swipe to edit
const LeftAction = ( prog: SharedValue<number>, drag: SharedValue<number> ) => {

    const stlyeAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: drag.value - 50 }]
        }
    });

    return (
        <Reanimated.View style={stlyeAnimation} >
            <View style={styles.action}>
                <Feather name="edit" size={24} color="#FFE4A1" />
            </View>
        </Reanimated.View>
    );

};

const FlatListItem = ({ storeName, storeId }: FlatListItemProps) => {

    // Theme styles
    const colorScheme = useColorScheme();
    const themeBackgroundColour = colorScheme === 'dark' ? styles.darkBackgroundColour : styles.lightBackgroundColour;
    const themeColour = colorScheme === 'dark' ? styles.darkColour : styles.lightColour;
    const themeBorderColour = colorScheme === 'dark' ? styles.darkBorderColour : styles.lightBorderColour;


    // Import database 
    const db = useSQLiteContext();
    const { fetchStores, deleteStore } = useStoreDatabase(db);

    // Handle delete store function 
    const handleDeleteStore = async () => {
        if (storeId !== null ){
            try {
                console.log(storeId);
                await deleteStore(storeId);
                const updateStores = await fetchStores();
                state$.stores.set(updateStores);
            } catch (error){
                console.error("Error delete stores", error)
        } 
    } else {
        console.warn("Store ID is null, cannot delete store");
    }
};

    return (
        <ReanimatedSwipeable
            containerStyle={[styles.container, themeBorderColour]}
            friction={1.5}
            rightThreshold={10}
            renderRightActions={RightAction}
            renderLeftActions={LeftAction}
            onSwipeableOpen={(direction) => {
                if (direction === 'left'){
                    handleDeleteStore();
                }
                if (direction === 'right'){
                    // Handle edit store action here
                }
            }}
        >    
                <Text style={[styles.text, themeColour]}>{storeName}</Text>

        </ReanimatedSwipeable>
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
        justifyContent: "center",
        borderWidth: 3,
        borderRadius: 8,
        padding: 10,
        
  },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: '100%',
        paddingHorizontal: 20,
  },

    action: {
        width: 50,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFE4A1',
        fontSize: 14,
        textAlign: 'center',
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
    lightBorderColour: {
        borderColor: '#0A1931',
  },
    darkBorderColour: {
        borderColor: '#FFE4A1',
  },  
    

});