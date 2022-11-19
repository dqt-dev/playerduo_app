import '../styles/sidebar.css';
import React, { useState, useEffect } from "react";
import CategoryService from "../services/CategoryService";
import { BASE_URL } from '../common/SystemConstant';

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
    <div className='sidebar pt-3'>
      <h3 className="ms-3">Tất các các game</h3>
      {categories &&
        categories.map((category, index) => (
          <div key={index} className="mb-3 card-category" style={{width: "280px", height: "55px"}}>
          <div className="row g-0 row-category">
              <div className="col-md-1 mx-auto">
                  <img src={BASE_URL + category.imageUrl} style={{ width: "50px" }} className="mt-1" alt="..." />
              </div>
              <div className="col-md-10">
                  <div className="card-body">
                      <p className="card-text text-start ms-3">{category.categoryName}</p>
                  </div>
              </div>
          </div>
      </div>
        ))}
    </div>
  )
}

export default SiderBar