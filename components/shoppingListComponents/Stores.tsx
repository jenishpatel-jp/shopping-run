import { Text, View, StyleSheet } from "react-native";
import { state$ } from "../../lib/state";
import { use$ } from "@legendapp/state/react";

type StoreProps = {
    storeName: string;
};


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
    width: "100%",
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  }
});