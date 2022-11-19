import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import coin from '../coin.png'
import { BASE_URL } from '../common/SystemConstant'

function OrderForm({ skillDetail, setSkillDetail, title }) {
  const [loaded, setLoaded] = useState(false);

  const [price, setPrice] = useState(skillDetail.price);
  return (
    <>
      <Loading loading={loaded} />
      <div className="modal " id="exampleModalSkill" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className='text-center text-24px pt-3 fw-bold pb-2'>{title}</div>
            <div className='container-fluid mt-2'>
              {
                skillDetail.categoryName &&
                <div className='row mb-3'>
                  <div className='col-3'>
                    <label>Tên Game:</label>
                  </div>
                  <label className='col-9'>{skillDetail.categoryName}</label>
                </div>
              }
              <div className='row mb-3'>
                <div className='col-3'>
                  <label>Mô tả:</label>
                </div>
                <div className='col-9'>
                  <textarea
                    className='form-control'
                    value={skillDetail.description}
                    onChange={(e) => setSkillDetail({...skillDetail, description: e.target.value})}
                  />
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-3'>
                  <label>Giá tiền:</label>
                </div>
                <div className='col-9 '>
                  <div className='input-group'>
                    <input
                      className='form-control'
                      type="number"
                      value={skillDetail.price}
                      min="10"
                      max="10000"
                      step="10"
                      aria-describedby="basic-addon2"
                      onChange={(e) => setSkillDetail({...skillDetail, price: e.target.value})}
                    />
                    <div className='input-group-append'>
                      <span className='input-group-text' id="basic-addon2"><img className='h-20 ' style={{ marginTop: "2px" }} src={coin} />  </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-3'>
                  <label>Giọng lói:</label>
                </div>
                <div className='col-9'>
                  <input className='form-control' type="file"  />
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-3'>
                  <label>Hình ảnh:</label>
                </div>
                <div className='col-9'>
                  <input className='form-control' type="file"  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderForm