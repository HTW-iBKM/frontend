export const isEmail = (string: string): boolean => {
    return /\S+@\S+\.\S+/.test(string)
}

export function getFormattedDate(d: Date): string {
    const months = [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12'
    ];

    const day = d.getDate();
    const month = months[d.getMonth()];

    return `${day < 10 ? '0'+day : day}.${month}.${d.getFullYear()}`;
}

export function getFormattedTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
}
