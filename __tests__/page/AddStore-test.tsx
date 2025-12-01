import { render, screen } from '@testing-library/react-native';
import AddStore from '../../app/page';
import { SQLiteProvider } from 'expo-sqlite';



describe('Add Store page', () => {
    test('renders correctly', () => {
        render(
        <SQLiteProvider databaseName='shoppingList' >
            <AddStore />
        </SQLiteProvider>);

        const input = screen.getByTestId('store-input');
        expect(input).toBeTruthy();
        expect(input.props.placeholder).toBe('Enter store name');

        expect(screen.getByText('Add')).toBeTruthy();
    });
})