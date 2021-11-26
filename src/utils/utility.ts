

export const isEmail = (string: string) => {
    return /\S+@\S+\.\S+/.test(string)
}