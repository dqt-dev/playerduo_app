import React from 'react'

import { GiCheckMark } from 'react-icons/gi';
import { CgClose } from 'react-icons/cg';

function PaypalSuccess() {
    return (
        <>
            <header className="site-header" id="header">
                <h1 className="site-header__title" data-lead-id="site-header-title">THANK YOU!</h1>
            </header>

            <div className="main-content">
                <i className="fa fa-check main-content__checkmark" id="checkmark"></i>
                <p className="main-content__body" data-lead-id="main-content-body">Thanks a bunch for filling that out. It means a lot to us, just like you do! We really appreciate you giving us a moment of your time today. Thanks for being you.</p>
            </div></>
    )
}

export default PaypalSuccess