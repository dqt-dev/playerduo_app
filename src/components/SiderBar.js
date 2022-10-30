import '../styles/sidebar.css';
import React, { useState, useEffect } from "react";
import CategoryService from "../services/CategoryService";

function SiderBar() {
  const [categories, setCategories] = useState([]);
  // chỉ thực thi khi render lần đầu tiên
  useEffect(() => {
    retrieveCategories();
  }, []);
  // truy vấn đến database, gọi hàm get all đế lấy ra tất cả các record 
  const retrieveCategories = () => {
    CategoryService.getAll()
      .then(response => {
        setCategories(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <div className='sidebar'>
      <h1>Tất các các game</h1>
      {categories &&
        categories.map((category, index) => (
          <li
            key={index}
          >
            <img src={"https://localhost:7207" + category.imageUrl} style={{ width: "40px" }} />
            {category.categoryName}
          </li>
        ))}
    </div>
  )
}

export default SiderBar