import { SQLiteDatabase } from "expo-sqlite";
import { Text, View, StyleSheet } from "react-native";

type SectionListItemProps = {
  item: string;
  db: SQLiteDatabase;
};

const SectionListItem = ( { item, db } : SectionListItemProps ) => {
  return (
    <View>
        <Text>{item}</Text>
    </View>
  )
}

export default SectionListItem

const styles = StyleSheet.create({
  item: {
    fontSize: 18,
    padding: 10,
    backgroundColor: "#f9c2ff",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },

});