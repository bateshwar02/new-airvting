import React, { memo } from 'react';

function RelatedProduct() {
  const getContent = () => (
    <ul className="uk-slider-items uk-child-width-1-4@m uk-child-width-1-3@s uk-grid">
      <li>
        <div className="store-inner-related-product-box">
          <a href="store-inner.php">
            <div className="store-inner-related-product-img"><img src="assets\images\store-img\t1.jpg" alt="" /></div>
            <h4>Navy-off-Shoulder</h4>

          </a>
          <div className="store-inner-related-price">
            <span className="discount-price">
              <i className="icon-line-awesome-tag" />
              $168.00
            </span>
            <span className="sale-price">$142.50</span>
          </div>
          <div className="store-inner-stars">

            <ul>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-material-baseline-star-border" /></li>
            </ul>

          </div>
          <a href="my-cart.php">
            <button className="btn-addcart-related button default" type="button">
              <i className="icon-line-awesome-cart-plus" />
              {' '}
              Add To Cart
            </button>

          </a>
        </div>
      </li>
      <li>
        <div className="store-inner-related-product-box">
          <a href="store-inner.php">
            <div className="store-inner-related-product-img"><img src="assets\images\store-img\t1.jpg" alt="" /></div>
            <h4>Navy-off-Shoulder</h4>

          </a>
          <div className="store-inner-related-price">
            <span className="discount-price">
              <i className="icon-line-awesome-tag" />
              $168.00
            </span>
            <span className="sale-price">$142.50</span>
          </div>
          <div className="store-inner-stars">

            <ul>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-material-baseline-star-border" /></li>
            </ul>

          </div>
          <a href="my-cart.php">
            <button className="btn-addcart-related button default " type="button">
              <i className="icon-line-awesome-cart-plus" />
              {' '}
              Add To Cart
            </button>

          </a>
        </div>
      </li>
      <li>
        <div className="store-inner-related-product-box">
          <a href="store-inner.php">
            <div className="store-inner-related-product-img"><img src="assets\images\store-img\t1.jpg" alt="" /></div>
            <h4>Navy-off-Shoulder</h4>

          </a>
          <div className="store-inner-related-price">
            <span className="discount-price">
              <i className="icon-line-awesome-tag" />
              $168.00
            </span>
            <span className="sale-price">$142.50</span>
          </div>
          <div className="store-inner-stars">

            <ul>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-material-baseline-star-border" /></li>
            </ul>

          </div>
          <a href="my-cart.php">
            <button className="btn-addcart-related button default " type="button">
              <i className="icon-line-awesome-cart-plus" />
              {' '}
              Add To Cart
            </button>

          </a>
        </div>
      </li>
      <li>
        <div className="store-inner-related-product-box">
          <a href="store-inner.php">
            <div className="store-inner-related-product-img"><img src="assets\images\store-img\t1.jpg" alt="" /></div>
            <h4>Navy-off-Shoulder</h4>

          </a>
          <div className="store-inner-related-price">
            <span className="discount-price">
              <i className="icon-line-awesome-tag" />
              $168.00
            </span>
            <span className="sale-price">$142.50</span>
          </div>
          <div className="store-inner-stars">

            <ul>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-material-baseline-star-border" /></li>
            </ul>

          </div>
          <a href="my-cart.php">
            <button className="btn-addcart-related button default " type="button">
              <i className="icon-line-awesome-cart-plus" />
              {' '}
              Add To Cart
            </button>

          </a>
        </div>
      </li>
      <li>
        <div className="store-inner-related-product-box">
          <a href="store-inner.php">
            <div className="store-inner-related-product-img"><img src="assets\images\store-img\t1.jpg" alt="" /></div>
            <h4>Navy-off-Shoulder</h4>

          </a>
          <div className="store-inner-related-price">
            <span className="discount-price">
              <i className="icon-line-awesome-tag" />
              $168.00
            </span>
            <span className="sale-price">$142.50</span>
          </div>
          <div className="store-inner-stars">

            <ul>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-line-awesome-star" /></li>
              <li><i className="icon-material-baseline-star-border" /></li>
            </ul>

          </div>
          <a href="my-cart.php">
            <button className="btn-addcart-related button default " type="button">
              <i className="icon-line-awesome-cart-plus" />
              {' '}
              Add To Cart
            </button>

          </a>
        </div>
      </li>
    </ul>
  );

  return (
    <>
      {getContent()}
    </>
  );
}

RelatedProduct.propTypes = {};

export default memo(RelatedProduct);
