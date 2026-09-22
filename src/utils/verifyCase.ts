export const isLowerCase = (text: string): boolean => {
    const lowerCaseText = text.toLowerCase();

    return lowerCaseText === text;
};

export const isUpperCase = (text: string): boolean => {
    const uppercaseText = text.toUpperCase();

    return text === uppercaseText;
};
