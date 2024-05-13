import Store from '@/components/Store';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Store/>
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
