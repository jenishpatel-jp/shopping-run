import { Text, View, StyleSheet } from "react-native";
import { state$ } from "../../lib/state";

type StoreProps = {
    storeName: string;
};

export const storesData = state$.stores.get(); 

export const Stores = ( { storeName } : StoreProps ) => (
    <View style={styles.item}>
        <Text style={styles.title}>{storeName}</Text>
    </View>
);


const styles = StyleSheet.create({
    item: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  }
});