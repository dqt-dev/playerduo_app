import React from 'react';
import '../styles/wallet.css';

import coin from '../coin.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserSerice';
import { useEffect } from 'react';
import { formatNumberWithComma, handleConvertDate } from '../common/ultil';
import Loading from './Loading';
import { useSelector } from 'react-redux';



function WalletPage() {

    const currentUserId = useSelector(state => state.userInfoReducer.userInfo)?.id;

    const [loaded, setLoaded] = useState(false);

    const navigate = useNavigate();

    const recommendPackage = [
        { money: 5, coin: 100 },
        { money: 10, coin: 220 },
        { money: 15, coin: 350 },
        { money: 20, coin: 500 },
        { money: 25, coin: 670 },
        { money: 30, coin: 850 },
        { money: 35, coin: 1050 },
        { money: 40, coin: 1250 },
        { money: 45, coin: 1480 },
        { money: 100, coin: 1700 },
    ]

    const convertType = (type) =>
    {
        return type === 1 ? "Nạp tiền" 
        : type === 2 ? "Thanh toán đơn hàng"
        : type === 3 ? "Hoàn tiền hủy đơn"
        : "Nhận tiền"
    }

    const [currentUser, setCurrentUser] = useState();

    const getUserInfo = (userId) => {
        setLoaded(true);
        UserService.get(userId)
            .then(response => {
                setLoaded(false);
                setCurrentUser(response.data);
            })
            .catch(e => {
                setLoaded(false);
                console.log(e);
            });
    };

    useEffect(() => {
        getUserInfo(currentUserId);
    }, [currentUserId]);

    const [history, setHistory] = useState();

    const getTradesHistory = () => {
        setLoaded(true);
        UserService.getTradesHistory()
            .then(response => {
                setLoaded(false);
                setHistory(response.data);
            })
            .catch(e => {
                setLoaded(false);
                console.log(e);
            });
    }

    useEffect(() => {
        getTradesHistory();
    }, []);

    const handleLog = (paymentRequest) => {
        navigate('/checkout', { state: { paymentRequest: paymentRequest } });
    }

    return (
        <div className='ms-4 mt-3' style={{ width: "900px" }}>
            <Loading loading= {loaded}/>
            <div className='border rounded text-20px fw-bold d-flex pt-2 pb-2' style={{ backgroundColor: "#ffff" }}>
                <div className='ms-3'>Số dư tài khoản:</div>
                <div className=' fw-bold ps-1 cursor-pointer text-20px cursor-pointer ms-2 me-1'>{currentUser?.coin && formatNumberWithComma(currentUser.coin)}</div>
                <img src={coin} style={{ height: "30px" }} />
            </div>

            <div className='border border-info mt-3'>
                <div className='text-20px fw-bold ms-3'>
                    Các gói giá trị nạp
                </div>
                <div className='d-flex flex-wrap justify-content-around pb-3'>
                    {recommendPackage.map(item => {
                        return (
                            <div onClick={() => handleLog(item)} className='rounded border wallet-item mt-3 ' data-bs-toggle="modal" data-bs-target="#exampleCheckoutModal">
                                <div className='d-flex justify-content-center pt-2'>
                                    <img src={coin} />
                                    <div className=' fw-bold ps-1 cursor-pointer text-20px cursor-pointer'>{formatNumberWithComma(item?.coin)}</div>
                                </div>
                                <hr className='mt-2 mb-0' />
                                <div className='d-flex justify-content-center pt-2'>
                                    <div className=' fw-bold ps-1 cursor-pointer'>{formatNumberWithComma(item?.money)}$</div>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
            <div className=''>
                <div className='text-20px fw-bold'>
                    Lịch sử giao dịch
                </div>
                <table id="example" className="table table-striped" style={{ width: "100%" }} >
                    <thead>
                        <tr>
                            <th>Ngày giao dịch</th>
                            <th>Loại giao dịch</th>
                            <th>Xu</th>
                        </tr>
                    </thead>
                    <tbody>

                        {history && history.length > 0 ? history.map((item, index) => {
                            return (
                                <tr key = {index}>
                                    <td className='fw-bold'>{handleConvertDate(item.createdAt)}</td>
                                    <td className='fw-bold'>{convertType(item.type)}</td>
                                    {item.type !== 2 ? <td className='coin-plus fw-bold'> + {formatNumberWithComma(item?.coin)} xu</td> :
                                    <td className='coin-minus fw-bold'> - {formatNumberWithComma(item?.coin)} xu</td>}
                                </tr>
                            )
                        }
                        ) : <></>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WalletPage