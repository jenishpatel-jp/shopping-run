import {
  Text,
  View,
  StyleSheet,
  PanResponder,
  Touchable,
  TouchableOpacity,
} from "react-native";

import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated from "react-native-reanimated";

type StoreProps = {
  storeName: string;
};

export const Stores = ({ storeName }: StoreProps) => {
  const pandResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {},
    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dx < -50) {
        console.log("Swipe left detected");
      }
    },
  });

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemContainer} {...pandResponder.panHandlers}>
        <Text style={styles.title}>{storeName}</Text>
        <TouchableOpacity
          onPress={() => console.log("delete")}
          style={styles.deleteButton}
        >
          <Text style={{ color: "white" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
    color: "white",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  item: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    marginVertical: 8,
    width: "70%",
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },

  deleteButton: {
    color: "white",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    right: -150, // moves the delete button off the screen to the right
  },
});
