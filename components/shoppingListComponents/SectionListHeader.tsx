import { Text, View, StyleSheet, useColorScheme } from "react-native";
import { state$ } from "../../lib/state";
import { SQLiteDatabase } from "expo-sqlite";

//React Native Gesture Handler and Animated
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import Feather from '@expo/vector-icons/Feather';
import { useStoreDatabase } from "../../lib/store";

type SectionListHeaderProps = {
    title: string;
    db: SQLiteDatabase;
    storeId: number;
};

const RightAction = ( prog: SharedValue<number>, drag: SharedValue<number> ) => {
  
    const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 50 }]
    };
  });

    const colorScheme = useColorScheme();

  return (
    <Reanimated.View style={styleAnimation}>
      <View style={styles.rightAction}>
        <Feather name="trash-2" size={24} color={colorScheme === 'dark' ? "#FFE4A1" : "#0A1931"}/>
      </View>
    </Reanimated.View>
  )
};

const SectionListHeader = ( { title, db, storeId } : SectionListHeaderProps ) => {

    const { deleteStore, fetchStores } = useStoreDatabase(db);

    const handleDeleteStore = async () => {
        if (storeId !== null ){
            try {
                console.log(storeId)
                await deleteStore(storeId);
                const updatedStores = await fetchStores();
                state$.stores.set(updatedStores);
            } catch (error){
                console.error("Error delete stores", error)
            }
        } else {
            console.warn("Store ID is null, cannot delete store");
        }
    };

    const colorScheme = useColorScheme();
    const themeBackgroundColour = colorScheme === 'dark' ? styles.darkBackgroundColour : styles.lightBackgroundColour;
    const themeColour = colorScheme === 'dark' ? styles.darkColour : styles.lightColour;

    return (
        <ReanimatedSwipeable
            containerStyle={[styles.container, themeBackgroundColour]}
            friction={1.5}
            rightThreshold={10}
            renderRightActions={RightAction}
            onSwipeableOpen={(direction) => {
                if(direction === 'left'){
                    handleDeleteStore()
                }
            }}
        >
            <Text style={[styles.title, themeColour]} >{title}</Text>
        </ReanimatedSwipeable>
    )
}

export default SectionListHeader

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    },
    container: {
        padding: 10,
        
    },
    rightAction: {
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
  } ,
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