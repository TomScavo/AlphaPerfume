import React from 'react';
import { Link } from 'react-router-dom';

const PerfumeItem = ({ imgSrc, title, id }) => {
  return (
    <div className="item-wrap-single p-3">
      <Link to={`/perfumeDetail/${id}`}>
        <img src={require(`../../img/items/${imgSrc}.jpg`)} alt="" />
        <p className="py-4 text-capitalize">{title}</p>
      </Link>
    </div>
  );
};

export default PerfumeItem;
