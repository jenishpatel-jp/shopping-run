import { SQLiteDatabase } from "expo-sqlite";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { state$ } from "../../lib/state";

//React Native Gesture Handler and Animated
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

// Icons
import Feather from '@expo/vector-icons/Feather';

import { useItemDatabase } from "../../lib/items";
import { useEffect, useState } from "react";

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
        <Feather name="trash-2" size={24} color="#FFE4A1" />
      </View>
    </Reanimated.View>
  )
};


const SectionListItem = ( { itemName, db } : SectionListItemProps ) => {

  const [isPurchased, setIsPurchased] = useState(false);

  const { deleteItem, fetchAllItems } = useItemDatabase(db)

  const arrayObjectOfItems = state$.items.get();
  const itemSelected = arrayObjectOfItems.find((item) => item.itemName === itemName);
  const itemId = itemSelected ? itemSelected.itemId : null;
  const itemSelectedIndex = arrayObjectOfItems.findIndex((item) => item.itemName === itemName);


  const handlePress = () => {

    const newValue = !isPurchased;
    setIsPurchased(newValue);

    if (newValue){
      console.log("Item marked as purchased:", itemName);
      state$.items[itemSelectedIndex]['completed'].set(1); 
      // console.log(state$.items.get()[itemSelectedIndex]);
    } else {
      console.log("Item marked as not purchased:", itemName);
      state$.items[itemSelectedIndex]['completed'].set(0); 
      // console.log(state$.items.get()[itemSelectedIndex]);
    }
  }

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
      onSwipeableOpen={(direction) => {
        if (direction === 'left'){
          handleDeleteItem();
        }
      }}
    > 
      <View style={styles.itemContainer}>
        <Pressable onPress={handlePress} >
          <Feather name={isPurchased ? "check-circle" : "circle"} size={24} color="#FFE4A1" />
        </Pressable>

        <Text style={[styles.text, isPurchased && styles.textPurchased] }>{itemName}</Text>
      </View>
    </ReanimatedSwipeable>
  )
};

export default SectionListItem

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    backgroundColor: "#0A1931",
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    color: "#FFE4A1",
  },
  textPurchased: {
    fontSize: 20,
    color: "#FFE4A1",
    textDecorationLine: "line-through",

  },
  container: {
    flex: 1,
    backgroundColor: '#0A1931',
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: '100%',
    paddingHorizontal: 20,
  }


});