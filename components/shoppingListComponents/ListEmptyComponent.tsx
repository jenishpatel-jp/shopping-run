import { Link, Router } from "expo-router"
import { View, Text, StyleSheet } from "react-native"


const ListEmptyComponent = () => {
  return (
    <View>
        <Link href="/stores/addStore">
            <Text>Add a store to get started!</Text>
        </Link>
    </View>
  )
}

export default ListEmptyComponent