export const isEmail = (string: string): boolean => {
    return /\S+@\S+\.\S+/.test(string)
}
