import { reset } from '../../utils/resetButtonUtils';

describe("Function that resets the useState", () => {
    it("Should reset all the states to their initial value", ()=> {

        const setShoppingList = jest.fn();
        const setStoreList = jest.fn();
        const setCompletedItem = jest.fn();

        reset(setShoppingList, setStoreList, setCompletedItem);

        expect(setShoppingList).toHaveBeenCalledWith({});
        expect(setStoreList).toHaveBeenCalledWith([]);
        expect(setCompletedItem).toHaveBeenCalledWith([]);
    });
});