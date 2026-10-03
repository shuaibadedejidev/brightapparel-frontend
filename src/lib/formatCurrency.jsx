// Helper to convert cents into formatted USD ($0.00)
const formatCurrency = (amountInCents) => {
    if (amountInCents === undefined || amountInCents === null) return '$0.00';
    const dollars = amountInCents / 100;
    return `$${dollars.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};


export default formatCurrency