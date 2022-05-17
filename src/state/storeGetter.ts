import { AnyAction, EnhancedStore } from '@reduxjs/toolkit'
import { RootState } from './store'

type StoreType = EnhancedStore<RootState, AnyAction>

let store: StoreType
export function setStore(_store: StoreType) {
    store = _store
}

export function getStore() {
    return store
}
