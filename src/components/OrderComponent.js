import React, { useState } from 'react';
import { BASE_URL } from '../common/SystemConstant';
import coin from '../coin.png';
import RatingModal from './RatingModal';
import { toast } from 'react-toastify';
import OrderService from '../services/OrderService';
import { useEffect } from 'react';
import Loading from './Loading';
import { handleConvertDate } from '../common/ultil';
import { getMyInfo } from '../redux/UserInfo/action';
import { useDispatch, useSelector } from 'react-redux';

function OrderComponent() {

    const dispatch = useDispatch();

    const [loaded, setLoaded] = useState(false);

    const [orderId, setOrderId] = useState();

    const [orderType, setOrderType] = useState(true); // true is myOder , false is orderMe

    const [myOrder, setMyOrder] = useState([]);

    const [manageOrder, setManageOrder] = useState([]);

    const [isShow, setIsShow] = useState(false);

    const currentUser = useSelector(state => state.userInfoReducer.userInfo);

    const handleGetMyOrder = () => {
        setLoaded(true);
        OrderService.getNewOrder()
            .then(response => {
                setLoaded(false);
                setMyOrder(response.data.resultObj)
            })
            .catch(error => {
                setLoaded(false);
                console.log(error)
            });
    }

    const handleManageMyOrder = () => {
        setLoaded(true);
        OrderService.getOrdersManage()
            .then(response => {
                setLoaded(false);
                setManageOrder(response.data.resultObj)

            })
            .catch(error => {
                setLoaded(false);
                toast.error(error.response.data, {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
    }

    useEffect(() => {
        handleGetMyOrder();
        handleManageMyOrder();
    }, [orderType]);


    const handleFinish = (orderId) => {
        if(currentUser?.isEnabled === false)
        {
            toast.error("Bạn đã bị vô hiệu hóa tài khoản, vui lòng liên hệ Quản trị viên để giải quyết!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        OrderService.FinishOrder(orderId)
            .then(response => {
                handleManageMyOrder();
                toast.success(response.data, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            .catch(error => {
                handleManageMyOrder();
                toast.error(error.response.data, {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
    }


    const getStatusName = (status) => {
        return status === 1 ? "Chờ xác nhận"
            : status === 2 ? "Đang thực hiện"
                : status === 3 ? "Hoàn thành"
                    : status === 5 ? "Hoàn thành"
                        : "Đã hủy"
    }

    const handleConfirmOrder = (orderId) => {
        if(currentUser?.isEnabled === false)
        {
            toast.error("Bạn đã bị vô hiệu hóa tài khoản, vui lòng liên hệ Quản trị viên để giải quyết!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        OrderService.ConfirmOrder(orderId)
            .then(response => {
                handleManageMyOrder();
                dispatch(getMyInfo(response.data));
                toast.success("Đơn hàng đã được xác nhận!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            .catch(error => {
                handleManageMyOrder();
                toast.error(error.response.data, {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
    }

    const handleCancelOrder = (orderId) => {
        if(currentUser?.isEnabled === false)
        {
            toast.error("Bạn đã bị vô hiệu hóa tài khoản, vui lòng liên hệ Quản trị viên để giải quyết!", {
                position: toast.POSITION.TOP_RIGHT
            });
            return;
        }
        OrderService.CancelOrder(orderId)
            .then(response => {
                handleManageMyOrder();
                toast.success(response.data.resultObj, {
                    position: toast.POSITION.TOP_RIGHT
                });

            })
            .catch(error => {
                handleManageMyOrder();
                toast.error(error.response.data, {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
    }

    // type = 1: other people order me  | type = 2: my order
    const handleCheckStatus = (status, orderId, type) => {
        return (status === 1 && type === 1) ?
            <div className='d-flex'>
                <div onClick={() => handleConfirmOrder(orderId)} className='border btn btn-primary rounded ps-4 pe-4 pt-1 pb-1 fw-500 me-2'>
                    Xác nhận
                </div>
                <div onClick={() => handleCancelOrder(orderId)} className='border btn btn-warning rounded ps-4 pe-4 pt-1 pb-1 fw-500'>
                    Hủy
                </div>
            </div>
            : (status === 2 && type === 1) ?
                <div onClick={() => handleFinish(orderId)} className='border btn btn-primary rounded ps-4 pe-4 pt-1 pb-1 fw-500 me-2'>
                    Hoàn thành
                </div>
                : (status === 3 && type === 2) ?
                    <div onClick={() => { setOrderId(orderId); setIsShow(true) }} className='border btn btn-primary rounded ps-4 pe-4 pt-1 pb-1 fw-500 me-2' data-bs-toggle="modal" data-bs-target="#exampleRatingModal">
                        Đánh giá
                    </div>
                    : <></>
    }
    return (
        <div className='order-container ms-4 pt-3 fw-bold text-20px'>
            <Loading loading={loaded} />
            <RatingModal orderId={orderId} handleGetMyOrder={handleGetMyOrder} isShow={isShow} setIsShow={setIsShow} />
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
                                    {handleConvertDate(item.orderDate)}
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
                                    {handleCheckStatus(item.status, item.orderId, 2)}
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
                                    {handleConvertDate(item.orderDate)}
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
                                    {handleCheckStatus(item.status, item.orderId, 1)}
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