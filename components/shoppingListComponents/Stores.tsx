import {
  Text,
  StyleSheet,
} from "react-native";

import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { useStoreDatabase } from "../../lib/store";

import { useSQLiteContext } from "expo-sqlite";

const db = useSQLiteContext();

const { deleteStore } = useStoreDatabase(db);

type StoreProps = {
  storeName: string;
};



const handleDelete = () => {

}



function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    // console.log('showRightProgress:', prog.value);
    // console.log('appliedTranslation:', drag.value);

    return {
      transform: [{ translateX: drag.value + 50 }],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Text style={styles.rightAction}>Delete</Text>
    </Reanimated.View>
  );
}


export const Stores = ({ storeName }: StoreProps) => {


  return (
      <ReanimatedSwipeable 
        containerStyle={styles.swipeable}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={100}
        renderRightActions={RightAction}
        shouldCancelWhenOutside={false}
      >
        <Text style={styles.title}>{storeName}</Text>
      </ReanimatedSwipeable>
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
  rightAction: { 
    width: 50, 
    height: 50, 
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  separator: {
    width: '100%',
    borderTopWidth: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  swipeable: {
    height: 50,
    backgroundColor: 'black',
    alignItems: 'center',
  },

});
