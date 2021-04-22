import React, { Component } from 'react';

import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';

import '../Cart/Cart.scss';
import { check } from 'prettier';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      // product_quantity: 1,
      shoppingCarts: [],
      checkBox: true,
    };
  }

  inputValue = event => {
    const { value } = event.target;
    this.setState({
      product_quantity: value,
    });
  };

  addValue = event => {
    const { shoppingCarts } = this.state;
    const { id } = event.target;
    let newCart = [...shoppingCarts];

    if (newCart[id].quantity > 19) {
      return;
    } else {
      newCart[id].quantity += 1;
    }

    this.setState({
      shoppingCarts: newCart,
    });
  };

  minusValue = event => {
    const { shoppingCarts } = this.state;
    const { id } = event.target;
    let newCart = [...shoppingCarts];

    if (newCart[id].quantity < 2) {
      return;
    } else {
      newCart[id].quantity -= 1;
    }

    this.setState({
      shoppingCarts: newCart,
    });
  };

  allCheckBox = () => {
    const { shoppingCarts, checkBox } = this.state;
    const cartList = shoppingCarts.map(cart => {
      cart.isChecked = checkBox ? false : true;
      return cart;
    });
    // this.setState({
    //   checked: !this.state.checked,
    // });
  };

  clickCheckBox = () => {
    const { shoppingCarts } = this.state;
    let bool = shoppingCarts.every(check => check.isChecked);
    this.setState({
      checkBox: bool,
    });
  };

  componentDidMount() {
    fetch('/data/cartList.json', {
      headers: {
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.k8V9fYZNF2rrxKOSuD6rGL2QgVd1XOW-HnQOPuHoyiQ',
      },
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          shoppingCarts: data.results,
        });
      });
  }

  render() {
    const { product_quantity, shoppingCarts } = this.state;
    return (
      <div className="Cart">
        <Nav />
        <main>
          <div className="shoppingCart">
            <h1>SHOPPING CART</h1>
            <ul className="shoppingStep">
              <l1>Cart</l1>
              <li>
                <i className="fas fa-chevron-right"></i>
              </li>
              <l1>Order</l1>
              <li>
                <i className="fas fa-chevron-right"></i>
              </li>
              <li>Order confirmed</li>
            </ul>
          </div>
          <div className="PriceProduct">
            <h2>제품</h2>
            <table>
              <thead className="thread">
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={this.allCheckBox}
                      Checked={this.state.checkBox}
                    />
                  </th>
                  <th>제품 정보</th>
                  <th>수량</th>
                  <th>금액</th>
                  <th>복지혜택</th>
                  <th>합계금액</th>
                  <th>배송비</th>
                </tr>
              </thead>
              <tbody>
                {shoppingCarts.length !== 0 && (
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td rowSpan={shoppingCarts.length + 1}>
                      배송비 &#8361; 2,500
                    </td>
                  </tr>
                )}
                {shoppingCarts.length !== 0 &&
                  shoppingCarts.map((cart, index) => {
                    return (
                      <tr>
                        <td>
                          <input
                            type="checkbox"
                            id={index}
                            Checked={this.state.checked}
                          />
                        </td>
                        <td className="product">
                          <img src={cart.image} alt="" />
                          <div className="productInfo">
                            <h3>{cart.product_name}</h3>
                            <p>{cart.option} g</p>
                            <p>{cart.sub_category_name}</p>
                            <p>&#8361; {cart.product_price}</p>
                          </div>
                        </td>
                        <td className="quantity">
                          <li>
                            <span className="count">
                              <button
                                className="minus"
                                id={index}
                                onClick={this.minusValue}
                              >
                                -
                              </button>
                              <input
                                className="inputCount"
                                onChange={this.inputValue}
                                value={cart.quantity}
                              />
                              <button
                                className="plus"
                                id={index}
                                onClick={this.addValue}
                              >
                                +
                              </button>
                            </span>
                          </li>
                        </td>
                        <td>&#8361; {cart.product_price * cart.quantity}</td>
                        <td>-</td>
                        <td>&#8361; {cart.product_price * cart.quantity}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {shoppingCarts.length === 0 && (
              <div className="noProduct">
                장바구니에 담겨있는 상품이 없습니다.
              </div>
            )}
            <div className="priceAll">
              <span>
                총 {shoppingCarts.length} 개의 금액 {}원 + 배송비 2,500 원 = 총
                주문금액 {} 원
              </span>
            </div>
          </div>
          <button>선택 삭제</button>
          <div className="buttonContainer">
            <div className="shoppingContinue">쇼핑 계속하기</div>
            <div className="order">주문하기</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Cart;
