

import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ChatBoxComponent from './ChatBoxComponent';


function Test() {

  return (
    <>
      <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        Button with data-bs-target
      </button>

      <ChatBoxComponent/>
    </>
  );
}

export default Test