import { SQLiteDatabase } from "expo-sqlite";
import { Text, View, StyleSheet } from "react-native";

type SectionListItemProps = {
  item: string;
  db: SQLiteDatabase;
};

const SectionListItem = ( { item, db } : SectionListItemProps ) => {
  return (
    <View style={styles.container}> 
        <Text style={styles.item} >{item}</Text>
    </View>
  )
}

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
    paddingTop: 20,
  },

});