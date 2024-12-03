import type { PageInfo } from "./PageInfo";


export interface PaginatedResponse<T> {
    content: T[];
    page: PageInfo;
}