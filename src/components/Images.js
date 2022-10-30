import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'

function Images({categories}) {

    // const { categories } = categories

    const [currentItems, setCurrentItems] = useState([])

    const [pageCount, setPageCount] = useState(0)

    const [itemOffset, setItemOffset] = useState(0)

    const itemsPerPage = 7;

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % categories.length
        if(newOffset == 18)
        setItemOffset(0)
        else
        setItemOffset(newOffset)

        console.log("new", newOffset)
    }

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(categories.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(categories.length / itemsPerPage));
        console.log(endOffset)
      }, [itemOffset, itemsPerPage, categories]);

    return (
        <div className="container">
            <h2>Tìm bạn đồng hành</h2>
            <div style={{ display: "flex" }}>
                {currentItems.map(item => {
                    return (
                        <div class="card-group">
                            <div class="card">
                                <img src={"https://localhost:7207" + item.imageUrl} class="card-img-top rounded" alt="..." style={{ width: "142px" }} />
                                <div class="card-body">
                                    <p class="card-text" >{item.categoryName}</p>
                                </div>
                            </div>
                        </div>
                    );

                })}
            </div>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                // renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default Images