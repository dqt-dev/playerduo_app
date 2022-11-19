import React, { useEffect, useState } from 'react'
import Header from '../layout/Header'
import NavBar from '../layout/NavBar'
import '../styles/userinfo.css';
import { toast, ToastContainer } from 'react-toastify';
import OrderService from './../services/OrderService';
import { BASE_URL } from '../common/SystemConstant';
import OrderComponent from './OrderComponent';
import SkillUser from './SkillUser';

function UserInfo({type}) {
    const [orderType, setOrderType] = useState(true); // true is myOder , false is orderMe

    const getStatusName = (status) => {
        return status === 1 ? "Chờ xác nhận"
            : status === 2 ? "Đang thực hiện"
                : status === 3 ? "Hoàn thành"
                    : "Đã hủy"
    }

    const [myOrder, setMyOrder] = useState([]);

    const [manageOrder, setManageOrder] = useState([]);

    const handleGetMyOrder = () => {
        OrderService.getNewOrder()
            .then(response => {
                setMyOrder(response.data.resultObj)
            })
            .catch(error => {
                console.log(error)
            });
    }

    const handleManageMyOrder = () => {
        OrderService.getOrdersManage()
            .then(response => {
                setManageOrder(response.data.resultObj)

            })
            .catch(error => {
                toast.error(error.response.data, {
                    position: toast.POSITION.TOP_RIGHT
                });
            });
    }

    const handleConfirmOrder = (orderId) => {
        OrderService.putConfirmOrder(orderId, orderId)
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

    const handleCancelOrder = (orderId) => {
        OrderService.putCancelOrder(orderId, orderId)
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


    useEffect(() => {
        handleGetMyOrder();
        handleManageMyOrder();
    }, [orderType]);

    return (
        <>
            <Header/>
            <div className='d-flex'>
                <NavBar/>
                {type === 3 ? <OrderComponent orderType = {orderType} setOrderType = {setOrderType} myOrder  = {myOrder} manageOrder = {manageOrder} handleCancelOrder = {handleCancelOrder}  handleConfirmOrder = {handleConfirmOrder} getStatusName = {getStatusName}/> : <SkillUser/>}
            </div>
            <ToastContainer />

        </>
    )
}

export default UserInfo