import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

export default function Recipes() {

  return (
    <View style={styles.container}>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#40146B',
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F5A318',
  },
});
