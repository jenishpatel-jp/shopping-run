import { Text, View, StyleSheet } from "react-native";

type SectionListHeaderProps = {
    title: string;
}

const SectionListHeader = ( { title } : SectionListHeaderProps ) => {

  return (
    <View  style={styles.container}>
        <Text style={styles.title} >{title}</Text>
    </View>
  )
}

export default SectionListHeader

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    container: {
        padding: 10,
        backgroundColor: "black",
    }

});