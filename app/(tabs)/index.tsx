import Store from '@/components/Store';
import { SafeAreaView, SafeAreaViewBase, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Store/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40146B',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F5A318',
  },
});
