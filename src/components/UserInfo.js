import React, { useEffect, useState } from 'react'
import Header from '../layout/Header'
import NavBar from '../layout/NavBar'
import '../styles/userinfo.css';
import { toast, ToastContainer } from 'react-toastify';
import OrderService from './../services/OrderService';
import { BASE_URL } from '../common/SystemConstant';
import OrderComponent from './OrderComponent';
import SkillUser from './SkillUser';
import WalletPage from './WalletPage';

function UserInfo({type}) {
    const [orderType, setOrderType] = useState(true); // true is myOder , false is orderMe

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


    useEffect(() => {
        handleGetMyOrder();
        handleManageMyOrder();
    }, [orderType]);

    return (
        <>
            <Header/>
            <div className='d-flex'>
                <NavBar/>
                {type === 3 ? <OrderComponent orderType = {orderType} setOrderType = {setOrderType} myOrder  = {myOrder} manageOrder = {manageOrder} handleManageMyOrder = {handleManageMyOrder}/> 
                    : type = 2 ? <WalletPage/>
                    : <SkillUser/>}
            </div>
            <ToastContainer />

        </>
    )
}

export default UserInfo