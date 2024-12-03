export interface PageInfo {
    size: number;           // Number of items per page
    number: number;         // Current page number (0-based)
    totalElements: number;  // Total number of items
    totalPages: number;     // Total number of pages
}

export const DefaultPageInfo: PageInfo = {
    size: 25,
    number: 0,
    totalElements: 0,
    totalPages: 0
};