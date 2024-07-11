import { addStore, editStore, updateStoreName, deleteStore, deleteStoreIfNoItems } from '../../utils/storeUtils'

describe("storeUtils", ()=> {
    describe("addStore", () => {
        it("should add a new store to the storeList if the storename is valid and not already in the list", ()=> {
            const setStoreList = jest.fn();
            const storeList = ['Store A'];
            const storeName = 'Store B';

            addStore(storeName, storeList, setStoreList);

            expect(setStoreList).toHaveBeenCalledWith(['Store A', 'Store B']);
        });

        it("should not add the store if storeName is empty or already in the list", () => {
            const setStoreList = jest.fn();
            const storeList = ['Store A'];

            addStore('', storeList, setStoreList);
            addStore('Store A', storeList, setStoreList);

            expect(setStoreList).not.toHaveBeenCalled();
        });
    });
});