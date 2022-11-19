import React from 'react'

import coin from '../coin.png'
import { BASE_URL } from '../common/SystemConstant'

function OrderForm({skillDetail}) {
  return (
    <div className="modal " id="exampleModalSkill" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content d-flex flex-column  justify-content-center">
          <div className='text-center text-24px pt-3 fw-bold pb-2'>Xác nhận đơn hàng</div>
            {skillDetail.categoryName}
        </div>
      </div>
    </div>
  )
}

export default OrderForm