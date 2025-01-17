export function getFormattedDate(format: string): string {
    const today = new Date();
    const year = today.getFullYear();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');

    switch (format) {
        case 'yyyy-dd-mm':
            return `${year}-${day}-${month}`;
        case 'dd-mm-yyyy':
            return `${day}-${month}-${year}`;
        case 'mm-dd-yyyy':
            return `${month}-${day}-${year}`;
        case 'yyyy-mm-dd':
            return `${year}-${month}-${day}`;
        default:
            return "Invalid date format";
    }
}