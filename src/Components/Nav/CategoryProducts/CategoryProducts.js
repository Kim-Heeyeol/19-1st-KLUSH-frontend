import React, { Component } from 'react';

import '../CategoryProducts/CategoryProducts.scss';
import '../../../Styles/reset.scss';
import '../../../Styles/common.scss';

class CategoryProducts extends Component {
  render() {
    const { navList } = this.props;
    return (
      <div className="CategoryProducts">
        <div className="categoryContainer">
          {navList &&
            navList.map(main => {
              return (
                <ul key={main.id}>
                  <li>{main.name}</li>
                  {main.sub_categories &&
                    main.sub_categories.map(sub => {
                      return <li key={sub.id}>{sub.name}</li>;
                    })}
                </ul>
              );
            })}
        </div>
      </div>
    );
  }
}

export default CategoryProducts;
