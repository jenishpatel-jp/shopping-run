import { SQLiteDatabase } from "expo-sqlite";
import { Text, View, StyleSheet, Pressable, useColorScheme } from "react-native";
import { state$ } from "../../lib/state";
import { useRouter } from "expo-router";

//React Native Gesture Handler and Animated
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

// Icons
import Feather from '@expo/vector-icons/Feather';

import { useItemDatabase } from "../../lib/items";

type SectionListItemProps = {
  itemName: string;
  db: SQLiteDatabase;
  itemQuantity?: number;
  itemCompleted?: number;
};

// Right action for swipe to delete
const RightAction = ( prog: SharedValue<number>, drag: SharedValue<number> ) => {
  const styleAnimation = useAnimatedStyle(() => {

    return {
      transform: [{ translateX: drag.value + 50 }]
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <View style={styles.action}>
        <Feather name="trash-2" size={24} color="#FFE4A1" />
      </View>
    </Reanimated.View>
  )
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



const SectionListItem = ( { itemName, db, itemQuantity, itemCompleted } : SectionListItemProps ) => {

  const router = useRouter();

  const { deleteItem, fetchAllItems, updateItem } = useItemDatabase(db)

  const arrayObjectOfItems = state$.items.get();
  const itemSelected = arrayObjectOfItems.find((item) => item.itemName === itemName);
  const itemId = itemSelected ? itemSelected.itemId : null;
  //const itemSelectedIndex = arrayObjectOfItems.findIndex((item) => item.itemName === itemName);


  const handlePress = async () => {
    const newValue = itemCompleted ? 0 : 1;
    if (itemId !== null){
      try {
        await updateItem(itemId, newValue);
        const updatedItems = await fetchAllItems();
        state$.items.set(updatedItems);

      } catch(error){
        console.error("Error updating item", error)
      }
    }
  };

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

  const colorScheme = useColorScheme();
  const themeBackgroundColour = colorScheme === 'dark' ? styles.darkBackgroundColour : styles.lightBackgroundColour;
  const themeColour = colorScheme === 'dark' ? styles.darkColour : styles.lightColour


  return (
    <ReanimatedSwipeable 
      containerStyle={[ styles.container, themeBackgroundColour ]}
      friction={1.5}
      rightThreshold={10}
      renderRightActions={RightAction}
      renderLeftActions={LeftAction}
      onSwipeableOpen={(direction) => {
        if (direction === 'left'){
          handleDeleteItem();
        }
        if (direction === 'right'){
          router.push({
            pathname: '/page/editItem',
            params: { itemId: itemId ? itemId.toString() : "" },
          })
        }
      }}
    > 
      <View style={[  styles.itemContainer, themeBackgroundColour]}>
        <Pressable onPress={handlePress} >
          <Feather name={itemCompleted ? "check-circle" : "circle"} size={24} color={colorScheme === 'dark' ? "#FFE4A1" : "#0A1931"}/>
        </Pressable>

        <Text style={[
          styles.text, 
          themeColour, 
          itemCompleted ? [styles.textPurchased, themeColour] : null
          ]}>
            {itemName}{`  x${itemQuantity}`}
        </Text>
      </View>
    </ReanimatedSwipeable>
  )
};

export default SectionListItem

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  textPurchased: {
    fontSize: 20,
    textDecorationLine: "line-through",

  },
  container: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
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