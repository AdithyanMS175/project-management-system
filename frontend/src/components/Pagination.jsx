import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {

    if (totalPages <= 1) return null;

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="d-flex justify-content-center mt-4">
            {pages.map((page) => (
                <button
                    key={page}
                    className={`btn mx-1 ${currentPage === page ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;