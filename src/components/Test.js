

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

function Test() {
  const notify = () => toast.success("ákfjsakfj", {
    position: toast.POSITION.TOP_CENTER
    });

  return (
    <div> jshkashfk
      <button onClick={notify}>Notify !</button>
      <ToastContainer />
    </div>
  );
}

export default Test