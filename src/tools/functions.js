export const capitalize = str => (
    str.split('')
    .map((ch, i) => i === 0 ? ch.toUpperCase() : ch)
    .join('')
);

export const updateObject = (obj, dataToUpdate) => {
    return {
        ...obj,
        ...dataToUpdate
    };
};