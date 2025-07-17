import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  withTiming,
 } from "react-native-reanimated";

type StoreProps = {
  storeName: string;
};

export const Stores = ({ storeName }: StoreProps) => {



  return (
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{storeName}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    color: "white",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 1,
    padding: 10,

  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },

});
