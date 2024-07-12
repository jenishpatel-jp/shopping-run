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

    describe('editStore', () => { 
        it("should set the editing store index and new store name", () => {
            const setEditingStoreIndex = jest.fn();
            const setStoreName = jest.fn();
            const storeList = ['Store A', 'Store B'];
            const storeIndex = 1;

            editStore(storeIndex, storeList, setEditingStoreIndex, setStoreName);

            expect(setEditingStoreIndex).toHaveBeenCalledWith(storeIndex);
            expect(setStoreName).toHaveBeenCalledWith('Store B');
        });
     });

     describe('updateStoreName', () => {
        it('should update the store name and shopping list', () => {
          const setStoreList = jest.fn();
          const setShoppingList = jest.fn();
          const setEditingStoreIndex = jest.fn();
          const setNewStoreName = jest.fn();
          const storeList = ['Store A', 'Store B'];
          const editingStoreIndex = 1;
          const newStoreName = 'New Store B';
      
          updateStoreName(
            editingStoreIndex,
            newStoreName,
            storeList,
            setStoreList,
            setShoppingList,
            setEditingStoreIndex,
            setNewStoreName
          );
      
          expect(setStoreList).toHaveBeenCalledWith(['Store A', newStoreName]);
      
          // Capture the function passed to setShoppingList
          const updateShoppingListFunction = setShoppingList.mock.calls[0][0];
          const previousShoppingList = { 'Store B': ['item1', 'item2'] };
          const expectedUpdatedShoppingList = {
            'New Store B': ['item1', 'item2'],
          };
      
          // Manually call the captured function
          const updatedShoppingList = updateShoppingListFunction(previousShoppingList);
      
          expect(updatedShoppingList).toEqual(expectedUpdatedShoppingList);
          expect(setEditingStoreIndex).toHaveBeenCalledWith(null);
          expect(setNewStoreName).toHaveBeenCalledWith('');
        });
      });

     describe('deleteStore', ()=> {
        it('should delete the store from the store list and shopping list', ()=> {
            const setStoreList = jest.fn();
            const setShoppingList = jest.fn();
            const storeList = ['Store A', 'Store B'];
            const storeIndex = 1;

            deleteStore(storeIndex, storeList, setStoreList, setShoppingList);

            expect(setStoreList).toHaveBeenCalledWith(['Store A']);
            expect(setShoppingList).toHaveBeenCalledWith(expect.objectContaining({}));
        });
     });

});