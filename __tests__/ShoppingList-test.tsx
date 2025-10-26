import ShoppingList from "../App";
import { render } from "@testing-library/react-native";

describe("shopping list component", ()=> {
    test("Headerleft icon is rendered", ()=> {
        //Need to check this code properly
        const { getByTestId } = render(<ShoppingList />);
        const headerLeftIcon = getByTestId("header-left-icon");
        expect(headerLeftIcon).toBeTruthy();
    });

    //test headerLeft icon press navigate goes to settings page
})