import { render, screen } from '@testing-library/react-native';
import AddStore from '../../app/page';
import { SQLiteProvider } from 'expo-sqlite';



describe('Add Store page', () => {
    test('renders correctly', () => {
        render(
        <SQLiteProvider databaseName='shoppingList' >
            <AddStore />
        </SQLiteProvider>);
        const entreStoreInput = screen.getByPlaceholderText('Enter store name');
        expect(entreStoreInput).toBeTruthy();
    });
})