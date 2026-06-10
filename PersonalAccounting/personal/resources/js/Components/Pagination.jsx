import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
                <Button
                    variant="secondary"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <ChevronLeft size={16} />
                </Button>

                {startPage > 1 && (
                    <>
                        <Button
                            variant={1 === currentPage ? 'primary' : 'secondary'}
                            size="sm"
                            onClick={() => onPageChange(1)}
                        >
                            1
                        </Button>
                        {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
                    </>
                )}

                {pages.map((page) => (
                    <Button
                        key={page}
                        variant={page === currentPage ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </Button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="px-2 text-gray-400">...</span>}
                        <Button
                            variant={totalPages === currentPage ? 'primary' : 'secondary'}
                            size="sm"
                            onClick={() => onPageChange(totalPages)}
                        >
                            {totalPages}
                        </Button>
                    </>
                )}

                <Button
                    variant="secondary"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <ChevronRight size={16} />
                </Button>
            </div>
        </div>
    );
}
