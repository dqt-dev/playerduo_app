import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserService from "../services/UserSerice";

const PaypalCheckoutButton = (props) => {
    const navigate = useNavigate();
    const { paymentRequestInfo } = props;

    const [paidFor, setPaidFor] = useState(false);

    const [error, setError] = useState(null);

    const handleApprove = () => {
        // Call backend function to fulfill order

        UserService.Payment({coin: paymentRequestInfo.coin})
        .then(response => {
            setPaidFor(true);
            toast.success(response.data, {
                position: toast.POSITION.TOP_RIGHT
                });
        })
        .catch(error => {
            setPaidFor(false);
            toast.error(error.response.data, {
                position: toast.POSITION.TOP_RIGHT
            });
        });
    };

    if (paidFor) {
        // Display success message, modal or redirect user to success page
        alert("Thank you for your purchase!");
        // navigate('/payment/success');
    }

    if (error) {
        // Display error message, modal or redirect user to error page
        alert(error);
    }

    return (
        <PayPalButtons
            style={{
                color: "silver",
                layout: "horizontal",
                height: 48,
                tagline: false,
                shape: "pill"
            }}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: paymentRequestInfo.coin,
                            amount: {
                                value: paymentRequestInfo.money
                            }
                        }
                    ]
                });
            }}
            onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                console.log("order", order);

                const transactionId = order.purchase_units[0].payments.captures[0].id
                console.log('transactionId', transactionId);

                handleApprove(data.orderID);
            }}

            onError={(err) => {
                setError(err);
                console.error("PayPal Checkout onError", err);
            }}

            onCancel={() => {
                // Display cancel message, modal or redirect user to cancel page or back to cart
            }}

            onClick={(data, actions) => {
                // Validate on button click, client or server side
                const hasAlreadyBoughtCourse = false;

                if (hasAlreadyBoughtCourse) {
                    setError(
                        "You already bought this course. Go to your account to view your list of courses."
                    );

                    return actions.reject();
                } else {
                    return actions.resolve();
                }
            }}
        />
    );
}

export default PaypalCheckoutButton;