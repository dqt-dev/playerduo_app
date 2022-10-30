import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'

function UserPerGame(props) {

    const { data, categoryName } = props

    const [isShow, setIsShow] = useState(0)

    const [currentItems, setCurrentItems] = useState([])

    const [pageCount, setPageCount] = useState(0)

    const [itemOffset, setItemOffset] = useState(0)

    const itemsPerPage = 6

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length
        if (newOffset == 18)
            setItemOffset(0)
        else
            setItemOffset(newOffset)
    }


    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    return (
        <div className="container">
            <h2>Đồng hành đề cử:  <a href=''>{categoryName}</a></h2>

            {
                currentItems.length > 0 ?
                <div style={{ display: "flex" }}>
                {currentItems.map(item => {
                    return (
                        <div class="card-group">
                            <div class="card">
                                <img src={"https://localhost:7207" + item.avatarUrl} class="card-img-top rounded" alt="..." style={{ width: "142px" }} />
                                <div class="card-body">
                                    <p class="card-text" >{item.playerName}</p>
                                    <p class="card-text" >Rating: {item.rating} | Đã phục vụ: {item.total}</p>
                                    <p class="card-text" >{item.price}đ/ Trận</p>
                                </div>
                            </div>
                        </div>
                    );

                })}
            </div> : <h1>Hiện tại chưa có người đăng kí thể loại game này!</h1>
            }
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

export default UserPerGame