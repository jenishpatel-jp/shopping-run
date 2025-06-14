import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';


export default function ShoppingList() {

  const colorScheme = useColorScheme();
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  return (
    <ThemedView style={styles.container}>
      <StatusBar style="auto"/>
      <ThemedText >Starting the shopping run app </ThemedText>
      {/* <AddStoreComponent /> */}
      {/* <Store List Component /> */}

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize: 20,
  },
  lightThemeText: {
    color: '#000',
  },
  darkThemeText: {
    color: 'orange',
  },
  lightContainer: {
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: 'purple',
  },
});
