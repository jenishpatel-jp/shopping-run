// Legend State Global Configuration

import { observable } from "@legendapp/state";

type Store = {
    storeId: number;
    storeName: string;
}

type Item = {
    itemId: number;
    storeId: number;
    itemName: string;
    completed: number;
    quantity: number;
}

interface ShoppingListState {
    stores: Store[];
    items: Item[];
}

export const state$ = observable<ShoppingListState>({
    stores: [],
    items: [],
});
