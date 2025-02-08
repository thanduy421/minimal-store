import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

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

  if (pageCount < 2) return null;

  return (
    <div className="mt-8 flex justify-end">
      <div className="join">
        <button
          className="btn btn-sm sm:btn-md join-item"
          onClick={handlePrevPage}
        >
          Prev
        </button>
        {pages.map((pg) => {
          return (
            <button
              key={pg}
              className={`btn btn-sm sm:btn-md join-item ${
                pg === page && 'bg-base-300'
              }`}
              onClick={() => handlePageChange(pg)}
            >
              {pg}
            </button>
          );
        })}
        <button
          className="btn btn-sm sm:btn-md join-item"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
