import { useLocation } from "react-router-dom";
import PaypalCheckoutButton from "./PaypalCheckoutButton";

const Checkout = () => {
  const location = useLocation();

  const paymentRequestInfo = location.state.paymentRequest
  return (
    <div>

      {paymentRequestInfo.coin}
      <div className="paypal-button-container">
        <PaypalCheckoutButton paymentRequestInfo={paymentRequestInfo} />
      </div>
    </div>
  );
};

export default Checkout;