import React from 'react';
import { BASE_URL } from '../common/SystemConstant';
import coin from '../coin.png';

function OrderComponent({orderType, setOrderType,myOrder,manageOrder,handleCancelOrder, handleConfirmOrder, getStatusName}) {
  return (
    <div className='order-container ms-4 pt-3 fw-bold text-20px'>
    <div className='text-24px mb-2'>
        Đơn hàng
    </div>
    <div className='d-flex cursor-pointer'>
        {orderType ?
            < div >
                <div onClick={() => setOrderType(true)} className='ms-2 fw-bold' style={{ color: "blue" }}>
                    Đơn đã nhận
                </div>
                <div className="border mt-1 ms-2" style={{ height: "5px", backgroundColor: "blue" }}>
                </div>
            </div> :
            <div >
                <div onClick={() => setOrderType(true)} className='ms-2 fw-bold'>
                    Đơn đã nhận
                </div>
            </div>
        }
        {!orderType ?
            <div className="ms-4 cursor-pointer">
                <div onClick={() => setOrderType(false)} className='ms-2 fw-bold' style={{ color: "blue" }}>
                    Đơn của tôi
                </div>
                <div className="border mt-1 ms-2" style={{ height: "5px", backgroundColor: "blue" }}>
                </div>
            </div> :
            <div className="ms-4">
                <div onClick={() => setOrderType(false)} className='ms-2 fw-bold'>
                    Đơn của tôi
                </div>
            </div>
        }
    </div>
    <hr className='mt-1 mb-0' />
    <div className='list-order overflow-auto '>
        {!orderType && myOrder.map((item, index) => {
            return (
                <div key={index} className="order-item mt-4">
                    <div className='d-flex justify-content-between pt-3' >
                        <div className='ms-3' style={{ fontWeight: "500", height: "14px", color: "rgba(51,51,51)" }}>
                            11/11 20:01
                        </div>
                        <div className='me-3 text-14px fw-bold' style={{ color: "rgba(255,131,14)" }}>
                            {getStatusName(item.status)}
                        </div>
                    </div>
                    <hr className='text-gray' style={{ width: "98%", marginLeft: "1%" }} />
                    <div className="d-flex items-center justify-content-between mt-3">
                        <div className="text-20px font-bold text-#333333 ms-3">
                            <div className="d-flex">
                                <img className="w-44px h-44px rounded-50 mt-1" src={BASE_URL + item.avatarPlayerUrl} style={{ height: "64px" }} />
                                <div className='flex ms-3'>
                                    <div className="h-14px text-18px fw-bold text-#333333"> {item.playerName}</div>
                                    <div className="d-flex">
                                        <div className="text-16px text-gray fw-500">Dịch vụ đơn hàng: </div>
                                        <div className='text-16px fw-500 ms-1'>{item.categoryName}</div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="text-16px text-gray fw-500">Số lượng:</div>
                                        <div className='text-16px fw-500 ms-1'>{item.quality} lần</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className='text-gray' style={{ width: "98%", marginLeft: "1%" }} />
                    <div className='d-flex justify-content-between pb-3'>
                        <div className='d-flex'>
                            <div className='ms-3 fw-bold text-gray'>Tổng tiền được nhận: </div>
                            <div className='d-flex ms-3 mt-1'>
                                <img className='h-20 ' style={{ marginTop: "2px" }} src={coin} />
                                <div className='fw-bold ms-2 ' style={{ color: "rgba(255,131,14)", fontSize: "16px" }}>{item.totalPrice}</div>
                            </div>
                        </div>
                        <div className='me-3'>
                            {item.status == '3' ? <div className=" btn btn-secondary rounded ps-4 pe-4 pt-1 pb-1 fw-500">
                                Đặt lại
                            </div> : <></>}
                        </div>
                    </div>
                </div>
            )
        })}

        {orderType && manageOrder.map((item, index) => {
            return (
                <div key={index} className="order-item mt-4">
                    <div className='d-flex justify-content-between pt-3' >
                        <div className='ms-3' style={{ fontWeight: "500", height: "14px", color: "rgba(51,51,51)" }}>
                            11/11 20:01
                        </div>
                        <div className='me-3 text-14px fw-bold' style={{ color: "rgba(255,131,14)" }}>
                            {getStatusName(item.status)}
                        </div>
                    </div>
                    <hr className='text-gray' style={{ width: "98%", marginLeft: "1%" }} />
                    <div className="d-flex items-center justify-content-between mt-3">
                        <div className="text-20px font-bold text-#333333 ms-3">
                            <div className="d-flex">
                                <img className="w-44px h-44px rounded-50 mt-1" src={BASE_URL + item.avatarUserUrl} style={{ height: "64px" }} />
                                <div className='flex ms-3'>
                                    <div className="h-14px text-18px fw-bold text-#333333"> {item.orderedUserName}</div>
                                    <div className="d-flex">
                                        <div className="text-16px text-gray fw-500">Dịch vụ đơn hàng: </div>
                                        <div className='text-16px fw-500 ms-1'>{item.categoryName}</div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="text-16px text-gray fw-500">Số lượng:</div>
                                        <div className='text-16px fw-500 ms-1'>{item.quality} lần</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className='text-gray' style={{ width: "98%", marginLeft: "1%" }} />
                    <div className='d-flex justify-content-between pb-3'>
                        <div className='d-flex'>
                            <div className='ms-3 fw-bold text-gray'>Giá đã thanh toán: </div>
                            <div className='d-flex ms-3 mt-1'>
                                <img className='h-20 ' style={{ marginTop: "2px" }} src={coin} />
                                <div className='fw-bold ms-2 ' style={{ color: "rgba(255,131,14)", fontSize: "16px" }}>{item.totalPrice}</div>
                            </div>
                        </div>
                        <div className='me-3'>
                            {item.status == '1' ?
                                <div className='d-flex'>
                                    <div onClick={() => handleConfirmOrder(item.orderId)} className='border btn btn-primary rounded ps-4 pe-4 pt-1 pb-1 fw-500 me-2'>
                                        Xác nhận
                                    </div>
                                    <div onClick= {() => handleCancelOrder(item.orderId)} className='border btn btn-warning rounded ps-4 pe-4 pt-1 pb-1 fw-500'>
                                        Hủy
                                    </div>
                                </div>
                                : <></>}
                        </div>
                    </div>
                </div>
            )
        })}
    </div>

</div>
  )
}

export default OrderComponent