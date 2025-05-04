import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

const storage = {
    get: async (key: string): Promise<string | null> => {
        try {
            if (Platform.OS === 'web') {
                return localStorage.getItem(key);
            }
            return await SecureStore.getItemAsync(key);
        } catch (e) {
            console.log('Storage is unavaiilable: ', e);
            return null;
        }
    },
    set: async (key: string, value: string | null): Promise<void> => {
        try {
            if (Platform.OS === 'web') {
                value === null ? localStorage.removeItem(key) : localStorage.setItem(key, value);
            }
            value === null ? SecureStore.deleteItemAsync(key) : SecureStore.setItemAsync(key, value);
        } catch (e) {
            console.log('Storage is unavaiilable: ', e);
        }
    }
};

type StorageState = [[boolean, string | null], (value: string | null) => void ];

export function useStorageState(key: string): StorageState {
    const [isLoading,setLoading] = useState(true);
    const [value, setValue] = useState<string | null>(null);

    useEffect(() => {
        storage.get(key).then(value => {
            setValue(value);
            setLoading(false);
        });
    }, [key]);

    const updateValue = useCallback((newValue: string | null) => {
        setValue(newValue);
        storage.set(key, newValue);

    }, [key]);
    return [[isLoading, value], updateValue];
}