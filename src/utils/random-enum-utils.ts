export function getRandomEnumValue<T>(enumType: { [key: string | number]: T }): T {
    const enumValues = Object.values(enumType);
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex] as T;
}