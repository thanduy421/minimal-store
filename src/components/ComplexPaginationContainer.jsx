import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    handlePageChange(nextPage > pageCount ? 1 : nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = page - 1;
    handlePageChange(prevPage < 1 ? pageCount : prevPage);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? 'bg-base-300 border-base-300' : ''
        }`}
      >
        {pageNumber}
      </button>
    );
  };

  const addElipsisBtn = ({ key }) => {
    return (
      <button
        key={key}
        className="btn btn-xs sm:btn-md join-item hover:bg-transparent hover:border-transparent"
      >
        ...
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    //first button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    //ellipsis 1
    if (page > 2) {
      pageButtons.push(addElipsisBtn({ key: 'dots-1' }));
    }

    // active/current page
    if (page > 1 && page < pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    }

    //ellipsis 2
    if (page < pageCount - 1) {
      pageButtons.push(addElipsisBtn({ key: 'dots-2' }));
    }

    //last page
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );

    return pageButtons;
  };

  if (pageCount < 2) {
    return null;
  }

  return (
    <div>
      <div className="mt-8 flex justify-end">
        <div className="join">
          <button
            className="btn btn-xs sm:btn-md join-item"
            onClick={handlePrevPage}
          >
            Prev
          </button>
          {renderPageButtons()}
          <button
            className="btn btn-xs sm:btn-md join-item"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplexPaginationContainer;
