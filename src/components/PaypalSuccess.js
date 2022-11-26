import React from 'react'

import { GiCheckMark } from 'react-icons/gi';
import { CgClose } from 'react-icons/cg';

function PaypalSuccess() {
    return(               
        <div className='paypal-payment-success-wrapper'>
            <div className='small-header'>
                <HeaderNav />
            </div>
            <div className='paypal-payment-success__content'>
                <div className={!hasFailed ? 'green-check-icon' : 'red-cross-icon'}>
                    {
                        !hasFailed
                        ? <GiCheckMark />
                        : <CgClose />
                    }
                </div>
                <h1 className='title'>
                    {
                        !hasFailed 
                        ? 'Payment Success!'
                        : 'Payment Failed.'
                    }
                </h1>
                <p className='sub-title'>
                    {
                        !hasFailed
                        ? 'Tour booking confirmation has been send to your email!'
                        : 'Your payment has failed. Please try again later.'
                    }
                </p>
                {
                    !hasFailed &&
                    <div className='booking-detail'>
                        <p className='you-paid-for-title'>You paid for:</p>
                        <p className='description'>{tourName} from {providerName}</p>
                        <p className='total-price'>Total price: ${totalPrice}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default PaypalSuccess