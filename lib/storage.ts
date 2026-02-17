import AsyncStorage from '@react-native-async-storage/async-storage';

export async function get<T>(key: string): Promise<T | null> {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
}

export async function set<T>(key: string, value: T): Promise<void> {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
}

export async function remove(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}