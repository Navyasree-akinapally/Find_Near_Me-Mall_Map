export function isEmpty(value) {
    if (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    ) {
        return true;
    } else {
        return false;
    }
}

export function generateSlug(text) {
    // Convert the string to lowercase
    const lowerCaseText = text.toLowerCase();

    // Remove special characters (keeping alphanumeric characters and spaces)
    const cleanedText = lowerCaseText.replace(/[^a-z0-9\s-]/g, '');

    // Replace spaces and consecutive hyphens with a single hyphen
    const slug = cleanedText.replace(/\s+/g, '-').replace(/-+/g, '-');

    return slug;
}

export const truncateText = (text) => {
    return text.length > 25 ? text.substring(0, 25) + "..." : text;
}

export const priceFormate = (price) => {
    return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}