import { Text, View, StyleSheet } from "react-native";
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

const SectionListHeader = ( { title, db, storeId } : SectionListHeaderProps ) => {

  return (
    <View  style={styles.container}>
        <Text style={styles.title} >{title}</Text>
    </View>
  )
}

export default SectionListHeader

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    container: {
        padding: 10,
        backgroundColor: "black",
    }

});