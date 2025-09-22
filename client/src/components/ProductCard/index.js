//@flow

import * as React from 'react';
import { Card } from 'antd';
import './main.scss';
import FavoriteService from '../FavoriteService';

const handleTypeTranslate = (type: string) => {
  switch (type) {
    case 'buy':
      return 'купівля';
    case 'sell':
      return 'продаж';
    case 'free':
      return 'безкоштовно';
    default:
      return type;
  }
};

const handleCategoryTranslate = (category: string) => {
  switch (category) {
    case 'glass':
      return 'скло';
    case 'plastic':
      return 'пластик';
    case 'paper':
      return 'папір';
    case 'metal':
      return 'метал';
    default:
      return category;
  }
};

type ProductCardTypes = {
  price: number,
  image: string,
  category: string,
  title: string,
  currency: string,
  type: string,
  favorite: boolean,
};

function ProductCard({
  id = null,
  price,
  image,
  category,
  title,
  currency,
  type,
  favorite = false,
  userToken = false,
}: ProductCardTypes): React.Node {
  return (
    <Card
      hoverable
      className="home-cards"
      bodyStyle={{ paddingLeft: '10px', paddingRight: '10px' }}
      cover={<img style={{ height: '300px', objectFit: 'cover' }} alt="product" src={image} />}>
      {id !== null && (
        <div className="productCard-star">
          <FavoriteService fill={favorite} token={userToken} id={id} />
        </div>
      )}
      <h4 className="fs-6 mb-3">{title}</h4>
      <p>
        тип оголошення: <span className="fw-bolder">{handleTypeTranslate(type)}</span>
      </p>
      <p className="fst-italic">
        ціна: {price.toLocaleString('de-DE', { style: 'currency', currency: currency })}
      </p>
      <Card.Meta description={handleCategoryTranslate(category)} />
    </Card>
  );
}

export default ProductCard;
