import React from 'react'
import '../styles/footer.css';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineTwitter } from 'react-icons/ai';
import { BsInstagram } from 'react-icons/bs';
import { FaFacebookSquare } from 'react-icons/fa';
import logo from '../logo.png';
function Footer() {
  return (
    <div class="footer border">
      <div className='d-flex justify-content-between ps-5 pe-5 pt-2'>

        <div className='d-flex'>
          <img src={logo} style={{ height: "60px", borderRadius: "20px" }} />
          <div className='ms-2'>
            <div>
              YOYO Game
            </div>
            <div style={{ color: 'blue' }}>
              Made with ❤️ DangQuocTuan
            </div>
          </div>
        </div>
        <div className='text-center'>
          <div className='mt-2 text-20px fw-bold'>
            Ở đây luôn có những người bạn sẵn sàng chơi game cùng bạn
          </div>
          <div>
            @yoyogame.com.vn, 2022
          </div>
        </div>
        <div>
          <div className='text-20px fw-bold ms-2'>
            Liên hệ với tôi
          </div>
          <div className='d-flex justify-content-around'>
            <FcGoogle size={25} />
            <AiOutlineTwitter size={25} color="blue" />
            <BsInstagram size={25} />
            <FaFacebookSquare size={25} color="blue" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer