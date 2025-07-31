import { SQLiteDatabase } from "expo-sqlite";
import { Text, View, StyleSheet } from "react-native";

//React Native Gesture Handler and Animated
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type SectionListItemProps = {
  item: string;
  db: SQLiteDatabase;
};

const LeftAction = ( prog: SharedValue<number>, drag: SharedValue<number> ) => {
  const styleAnimation = useAnimatedStyle(() => {

    return {
      transform: [{ translateX: drag.value + 50 }]
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Text style={styles.leftAction}></Text>
    </Reanimated.View>
  )

};


const SectionListItem = ( { item, db } : SectionListItemProps ) => {
  return (
    <View style={styles.container}> 
        <Text style={styles.item} >{item}</Text>
    </View>
  )
};

export default SectionListItem

const styles = StyleSheet.create({
  item: {
    fontSize: 20,
    padding: 10,
    backgroundColor: "black",
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: "white",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  leftAction: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  }

});