import { SQLiteDatabase } from "expo-sqlite";
import { Text, View, StyleSheet } from "react-native";
import { state$ } from "../../lib/state";

//React Native Gesture Handler and Animated
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import Feather from '@expo/vector-icons/Feather';
import { useItemDatabase } from "../../lib/items";

type SectionListItemProps = {
  itemName: string;
  db: SQLiteDatabase;
};

const RightAction = ( prog: SharedValue<number>, drag: SharedValue<number> ) => {
  const styleAnimation = useAnimatedStyle(() => {

    return {
      transform: [{ translateX: drag.value + 50 }]
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <View style={styles.rightAction}>
        <Feather name="trash-2" size={24} color="white" />
      </View>
    </Reanimated.View>
  )
};


const SectionListItem = ( { itemName, db } : SectionListItemProps ) => {

  const { deleteItem, fetchAllItems } = useItemDatabase(db)

  const arrayObjectOfItems = state$.items.get();
  const itemToDelete = arrayObjectOfItems.find((item) => item.itemName === itemName);
  const itemId = itemToDelete ? itemToDelete.itemId : null;

  const handleDeleteItem = async () => {
    if (itemId !== null){
      try {
        await deleteItem(itemId);
        const updatedItems = await fetchAllItems();
        state$.items.set(updatedItems);
      } catch(error){
        console.error("Error deleting items", error)
      }
    } else {
      console.warn("Item ID is null, cannot delete item");
    }
  };

  return (
    <ReanimatedSwipeable 
      containerStyle={styles.container}
      friction={1.5}
      rightThreshold={10}
      renderRightActions={RightAction}
    > 
        <Text style={styles.item}>{itemName}</Text>
    </ReanimatedSwipeable>
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
  rightAction: {
    width: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  }

});