import React from 'react';
import { TiTick } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom';

function PaypalSuccess() {
    const navigate = useNavigate();
    return (
        <>
            <div className='card container mt-2' style={{ height: "420px", width: "500px" }}>
                <div className='d-flex justify-content-center text-center'>
                    <div>
                        <TiTick color='green' size={200} className="border mt-3" style={{ borderRadius: "50%", background: "#f8faf5" }} />
                        <div className='text-20px fw-bold mt-2'>Thanh toán thành công</div>
                        <div className='text-20px fw-bold mt-2'>Cảm ơn bạn đã đồng hành cùng chúng tôi ❤️</div>
                        <button className='btn btn-secondary mt-5' onClick={() => navigate('/user/wallet')}>
                            Quay lại
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaypalSuccess