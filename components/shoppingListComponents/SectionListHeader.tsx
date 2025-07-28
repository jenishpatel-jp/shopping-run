import { Text, View, StyleSheet } from "react-native";

type SectionListHeaderProps = {
    title: string;
}

const SectionListHeader = ( { title } : SectionListHeaderProps ) => {

  return (
    <View>
        <Text>{title}</Text>
    </View>
  )
}

export default SectionListHeader

const stlyes = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    container: {
        padding: 10,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "white",
    }

});