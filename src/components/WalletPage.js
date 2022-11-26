import React from 'react';
import '../styles/wallet.css';

import coin from '../coin.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function WalletPage() {

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

    const [data, setData] = useState(recommendPackage);

    const handleLog = (paymentRequest) => {
        navigate('/checkout', {state:{paymentRequest: paymentRequest}});
    }

    return (
        <div className='ms-4 mt-3' style={{ width: "900px" }}>
            <div className='border rounded text-20px fw-bold d-flex pt-2 pb-2' style={{ backgroundColor: "#ffff" }}>
                <div className='ms-3'>Số dư tài khoản:</div>
                <div className=' fw-bold ps-1 cursor-pointer text-20px cursor-pointer ms-2 me-1'>300</div>
                <img src={coin} style={{ height: "30px" }} />
            </div>

            <div className='border border-info mt-3'>
                <div className='text-20px fw-bold ms-3'>
                    Các gói giá trị nạp
                </div>
                <div className='d-flex flex-wrap justify-content-around pb-3'>
                    {data.map(item => {
                        return (
                            <div onClick={() => handleLog(item)} className='rounded border wallet-item mt-3'>
                                <div className='d-flex justify-content-center pt-2'>
                                    <img src={coin} />
                                    <div className=' fw-bold ps-1 cursor-pointer text-20px cursor-pointer'>{item.coin}</div>
                                </div>
                                <hr className='mt-2 mb-0' />
                                <div className='d-flex justify-content-center pt-2'>
                                    <div className=' fw-bold ps-1 cursor-pointer'>{item.money}$</div>
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
                <table id="example" class="table table-striped" style={{ width: "100%" }} >
                    <thead>
                        <tr>
                            <th>Ngày giao dịch</th>
                            <th>Loại giao dịch</th>
                            <th>Xu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tiger Nixon</td>
                            <td>System Architect</td>
                            <td>Edinburgh</td>
                        </tr>
                        <tr>
                            <td>Garrett Winters</td>
                            <td>Accountant</td>
                            <td>Tokyo</td>
                        </tr>
                        <tr>
                            <td>Ashton Cox</td>
                            <td>Junior Technical Author</td>
                            <td>San Francisco</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WalletPage