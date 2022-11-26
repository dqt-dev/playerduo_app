import { useLocation } from "react-router-dom";
import PaypalCheckoutButton from "./PaypalCheckoutButton";
import coin from '../coin.png'

const Checkout = () => {
  const location = useLocation();

  const paymentRequestInfo = location.state.paymentRequest
  return (
    <div className='border container' style={{ width: "30%" }}>

      <div>
        Bạn có muốn mua {paymentRequestInfo.coin} với giá {paymentRequestInfo.money}$ không?
        <div className='rounded border wallet-item mt-3'>
          <div className='d-flex justify-content-center pt-2'>
            <img src={coin} />
            <div className=' fw-bold ps-1 user-select-none text-20px user-select-none'>{paymentRequestInfo.coin}</div>
          </div>
          <hr className='mt-2 mb-0' />
          <div className='d-flex justify-content-center pt-2'>
            <div className=' fw-bold ps-1 user-select-none'>{paymentRequestInfo.money}$</div>
          </div>
        </div>
      </div>
      <div className="paypal-button-container">
        <PaypalCheckoutButton paymentRequestInfo={paymentRequestInfo} />
      </div>
    </div>
  );
};

export default Checkout;