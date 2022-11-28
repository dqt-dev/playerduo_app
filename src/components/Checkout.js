import { useLocation, useNavigate } from "react-router-dom";
import PaypalCheckoutButton from "./PaypalCheckoutButton";
import coin from '../coin.png'

const Checkout = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const paymentRequestInfo = location.state.paymentRequest
  return (
    <div className='border container mt-5' style={{ width: "30%" }}>
      <div className="d-flex flex-column align-items-center" >
        <div className="text-20px fw-bold pt-3">Bạn có muốn mua {paymentRequestInfo.coin} với giá {paymentRequestInfo.money}$ không?</div>
        <div className='mt-3 mb-3 border' style={{ width: "200px" }}>
          <div className='d-flex justify-content-center pt-2'>
            <img src={coin} />
            <div className=' fw-bold ps-1 cursor-pointer text-20px cursor-pointer'>{paymentRequestInfo.coin}</div>
          </div>
          <hr className='mt-2 mb-0' />
          <div className='d-flex justify-content-center pt-2'>
            <div className=' fw-bold ps-1 cursor-pointer'>{paymentRequestInfo.money}$</div>
          </div>
        </div>
        <div className="paypal-button-container" style={{ width: "400px" }}>
          <PaypalCheckoutButton paymentRequestInfo={paymentRequestInfo} />
        </div>
        <div className="pt-1 pb-2" style={{ width: "400px" }}>
          <button onClick={() => navigate('/user/wallet')} type="button" class="btn btn-secondary " style={{ width: "400px", height: "48px", borderRadius: "28px" }}>Quay lại</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;