export const getCSSVariable = (variable: string): string => {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim();
};