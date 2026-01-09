import React from "react";
import {Link } from "react-router-dom";
import "../../Css/Products.css";

// Import  images  from assets
import MyImg from "../../Assets/feed1.png";
import MyImg2 from "../../Assets/feed2.png";
import MyImg3 from "../../Assets/feed3.png";
import MyImg4 from "../../Assets/feed4.png";
import MyImg5 from "../../Assets/feed5.png";
import MyImg6 from "../../Assets/feed6.png";



const ProductCard = ({ image, title, price, altText }) => {
  return (
    <div className="card">
      <img src={image} className="card-img-top" alt={altText} />
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">
          <ul>
            <li>One bag has <b>50kg</b> packing</li>
            <li>Price is <b>Rs. {price}</b></li>
          </ul>
        </p>
        
        {/* Pass selected product details to Order page */}
        <Link to="/order" state={{ product: title, price }}>
          <button className="btn-order">Order Place</button>
        </Link>
        
      </div>
    </div>
  );
};

function Products() {
   
  return (
    <div className="product-container">
      <ProductCard image={MyImg} title="Bronze" price={1000} altText="Bronze product" />
      <ProductCard image={MyImg2} title="Silver" price={1200} altText="Silver product" />
      <ProductCard image={MyImg3} title="Gold" price={1500} altText="Gold product" />
    
      <ProductCard image={MyImg4} title="Platinum" price={1700} altText="Platinum product" />
      <ProductCard image={MyImg5} title="Diamond" price={1900} altText="Diamond product" />
      <ProductCard image={MyImg6} title="Master" price={2000} altText="Master product" />
    </div>
  );
}

export default Products;
