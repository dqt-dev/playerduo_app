import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

const PaypalCheckoutButton = (props) => {
    const { paymentRequestInfo } = props;

    const [paidFor, setPaidFor] = useState(false);

    const [error, setError] = useState(null);

    const handleApprove = (orderId) => {
        // Call backend function to fulfill order

        // if response is success
        setPaidFor(true);
        // Refresh user's account or subscription status

        // if response is error
        // alert("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
    };

    if (paidFor) {
        // Display success message, modal or redirect user to success page
        alert("Thank you for your purchase!");
    }

    if (error) {
        // Display error message, modal or redirect user to error page
        alert(error);
    }

    // handle confirm booking, create order in database, called after successful capture payment
    // const handleConfirm = async (transactionId) => {
    //     // check token
    //     const token = localStorage.getItem('user-token');
    //     if (!token) {
    //         this.props.history.push(`/login`);
    //     }
    //     const bookingSubRequest = this.props.location.state.bookingSubRequest;
    //     // check valid
    //     let { firstName, lastName, phone, email, identifyNumber, pickingPlace } = this.state;
    //     firstName = firstName.trim();
    //     lastName = lastName.trim();
    //     phone = phone.trim();
    //     email = email.trim();
    //     identifyNumber = identifyNumber.replace(/\s/g, '').trim();
    //     const adultsList = [...this.state.adultsList];
    //     const childrenList = [...this.state.childrenList];

    //     // change date time format to string dd/MM/yyyy
    //     for (let i = 0; i < adultsList.length; i++) {
    //         adultsList[i].dob = this.dateTimeToString(adultsList[i].dob);
    //     }
    //     for (let i = 0; i < childrenList.length; i++) {
    //         childrenList[i].dob = this.dateTimeToString(childrenList[i].dob);
    //     }

    //     // start point & end point
    //     const startPoint = bookingSubRequest.startPoint.includes('CustomerPoint&') ?
    //         `CustomerPoint&${pickingPlace}&${bookingSubRequest.startPoint.split('&')[2]}`
    //         :
    //         bookingSubRequest.startPoint;
    //     const endPoint = bookingSubRequest.endPoint.includes('CustomerPoint&') ?
    //         `CustomerPoint&${pickingPlace}&${bookingSubRequest.startPoint.split('&')[2]}`
    //         :
    //         bookingSubRequest.endPoint;

    //     // submit to api
    //     let bookingRequest = {
    //         tourId: bookingSubRequest.tourId,
    //         departureDate: bookingSubRequest.departureDate,
    //         adults: bookingSubRequest.adults,
    //         adultsList: adultsList,
    //         childrenList: childrenList,
    //         children: bookingSubRequest.children,
    //         touristName: `${firstName} ${lastName}`,
    //         touristPhone: phone,
    //         touristEmail: email,
    //         touristIdentity: identifyNumber,
    //         startPoint: startPoint,
    //         endPoint: endPoint,
    //         transactionId: transactionId
    //     }
    //     console.log('booking Request', bookingRequest);
    //     try {
    //         // this.setState({
    //         //     isBooking: true
    //         // })
    //         console.log("start calling api");
    //         let res = await axios.post(
    //             `${this.baseUrl}/api/Orders`,
    //             bookingRequest,
    //             {
    //                 headers: { Authorization: `Bearer ${token}` }
    //             }
    //         )

    //         // show toast notify
    //         setTimeout(() => {
    //             toast.success('Booking successful!');
    //         }, 1500)
    //         // to successful page
    //         this.props.history.push(`/checkout/result`,
    //             {
    //                 hasFailed: false,
    //                 tourName: bookingSubRequest.tourName,
    //                 providerName: bookingSubRequest.providerName,
    //                 totalPrice: bookingSubRequest.adults * bookingSubRequest.pricePerAdult + bookingSubRequest.children * bookingSubRequest.pricePerChild
    //             });

    //         // paypal payment
    //         // const paymentUrl = res.data;
    //         // window.open(paymentUrl);

    //     } catch (error) {
    //         if (!error.response) {
    //             toast.error("Network error");
    //             console.log(error)
    //             return;
    //         }
    //         if (error.response.status === 400) {
    //             console.log(error)
    //         }
    //         if (error.response.status === 401) {
    //             console.log(error);
    //             // redirect to login page or show notification
    //             this.props.history.push('/login');
    //         }
    //     } finally {
    //         setTimeout(() => {
    //             this.setState({
    //                 isBooking: false
    //             })
    //         }, 1500)
    //     }
    // }

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