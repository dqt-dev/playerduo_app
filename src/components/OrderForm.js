import React from 'react'

import coin from '../coin.png'
import { BASE_URL } from '../common/SystemConstant'

function OrderForm({user, currentSkill, quality, setQuality, handleOrder}) {
    return (
        <div className="modal " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content d-flex flex-column  justify-content-center">
                    <div className='text-center text-24px pt-3 fw-bold pb-2'>Xác nhận đơn hàng</div>
                    <div className="d-flex justify-content-center">
                        <div className='me-2'>
                            <img className="w-44px h-44px rounded-50 mt-1" src={BASE_URL + user?.avatarUrl} style={{ height: "44px", width: "44px" }} />
                        </div>
                        <div className="fw-bold text-20px mt-2"> {user?.nickName}</div>
                    </div>
                    <div className="modal-body d-flex flex-column justify-content-center"  >
                        <div className="d-flex justify-content-between ps-5 pe-5" >
                            <div>
                                Đơn hàng dịch vụ:
                            </div>
                            <div>
                                {currentSkill?.categoryName}
                            </div>
                        </div>
                        <hr style={{ width: "80%", marginLeft: "10%" }} />
                        <div className="d-flex justify-content-between ps-5 pe-5" >
                            <div>
                                Đơn giá:
                            </div>
                            <div>
                                <p className="d-flex align-items-center mb-1 card-text fw-bold fs-5" >{currentSkill?.price}<img style={{ height: "22px", width: "22px" }} src={coin} />/ Trận</p>
                            </div>
                        </div>
                        <hr style={{ width: "80%", marginLeft: "10%" }} />
                        <div className="d-flex justify-content-between ps-5 pe-5" >
                            <div>
                                Số đơn:
                            </div>
                            <div className="form-outline">
                                <input type="number" id="typeNumber" min='1' value={quality} onChange={e => setQuality(e.target.value)} className="form-control" style={{ width: "80px" }} />
                            </div>
                        </div>
                        <hr style={{ width: "80%", marginLeft: "10%" }} />
                        <div className="d-flex justify-content-between ps-5 pe-5" >
                            <div>
                                Tổng giá trị:
                            </div>
                            <div>
                                <p className="d-flex align-items-center mb-1 card-text fw-bold fs-5" >{quality * currentSkill?.price}<img style={{ height: "22px", width: "22px" }} src={coin} /></p>
                            </div>
                        </div>
                        <hr style={{ width: "80%", marginLeft: "10%" }} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <div>
                            <button type="button" className="btn btn-lg btn-order mb-4" onClick={() => handleOrder(currentSkill?.skillId, quality)} >Đặt đơn</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderForm