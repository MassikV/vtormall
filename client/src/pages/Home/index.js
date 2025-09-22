import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import emptyImg from 'images/emptyImage.png';
import './style.scss';
import ProductCard from 'components/ProductCard';
import { useUserToken, useFavorites, useCards } from 'rest';

function Home() {
  const [token] = useUserToken();
  const { favorites } = useFavorites(token);
  const { cards, errorCards } = useCards(1, 12);

  return (
    <div className="container-main">
      <Row style={{ marginTop: '10px' }}>
        <Col span={6}>
          <Link to="/products?category=glass">
            <img src="./img/glass.jpg" alt="Glass" className="Category"></img>
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/products?category=paper">
            <img src="./img/paper.jpg" alt="Paper" className="Category"></img>
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/products?category=metal">
            <img src="./img/metal.jpg" alt="Metal" className="Category"></img>
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/products?category=plastic">
            <img src="./img/plastic.jpg" alt="Plastic" className="Category"></img>
          </Link>
        </Col>
      </Row>
      <h3 className="PageHeader">Останні оголошення</h3>
      <ul className="container row mx-auto gap-3 list-unstyled py-3">
        {!errorCards &&
          cards.map((elem) => {
            const image =
              elem.images.length > 0 && elem.images[0].url ? elem.images[0].url : emptyImg;
            let favorite = false;
            if (favorites !== false) {
              favorite = favorites.includes(elem._id);
            }
            return (
              <li key={elem._id} className="col p-0 d-flex justify-content-center">
                <Link className="w-100 text-decoration-none" to={`/products/${elem._id}`}>
                  <ProductCard
                    id={elem._id}
                    price={elem.price}
                    category={elem.category}
                    image={image}
                    title={elem.title}
                    currency={elem.currency}
                    type={elem.type}
                    favorite={favorite}
                    userToken={token}
                  />
                </Link>
              </li>
            );
          })}
      </ul>
      <Link to={'/products?category=all'}>
        <p className="link-success">До всіх оголошень</p>
      </Link>
    </div>
  );
}

export default Home;
