

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import '../styles/test.css';

function Test() {
  const notify = () => toast.success("ákfjsakfj", {
    position: toast.POSITION.TOP_CENTER
  });

  return (
    <div class="bg-image hover-zoom">
      <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/053.webp" class="w-100" />
    </div>
  );
}

export default Test