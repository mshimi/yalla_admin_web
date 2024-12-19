import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

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

type PaginationComponentProps = {
    pageInfo: PageInfo;
    onPageChange: (pageNumber: number) => void;
    currentPage?   : number;
};

const PaginationComponent: React.FC<PaginationComponentProps> = ({ pageInfo, onPageChange, currentPage }) => {
    const { number, totalPages } = pageInfo;

    
  
    currentPage = currentPage || number;

    const handlePrevClick = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages - 1) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPaginationItems = () => {
        const items = [];
        const startPage = Math.max(0, currentPage - 2);
        const endPage = Math.min(totalPages - 1, currentPage + 2);

        if (startPage > 0) {
            items.push(
                <Pagination.Item key={0} active={currentPage === 0} onClick={() => onPageChange(0)}>
                    {1}
                </Pagination.Item>
            );
            if (startPage > 1) {
                items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
                    {i + 1}
                </Pagination.Item>
            );
        }

        if (endPage < totalPages - 1) {
            if (endPage < totalPages - 2) {
                items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
            }
            items.push(
                <Pagination.Item key={totalPages - 1} active={currentPage === totalPages - 1} onClick={() => onPageChange(totalPages - 1)}>
                    {totalPages}
                </Pagination.Item>
            );
        }

        return items;
    };

    return (
        
            <Pagination>
                <Pagination.First onClick={() => onPageChange(0)} disabled={currentPage === 0} />
                <Pagination.Prev onClick={handlePrevClick} disabled={currentPage === 0} />
                {renderPaginationItems()}
                <Pagination.Next onClick={handleNextClick} disabled={currentPage === totalPages - 1} />
                <Pagination.Last onClick={() => onPageChange(totalPages - 1)} disabled={currentPage === totalPages - 1} />
            </Pagination>
        
    );
};

export default PaginationComponent;