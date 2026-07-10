import React from 'react';

const categories = [
  'Cotton Sarees',
  'Silk Sarees',
  'Dress Materials',
  'Chudithars',
  'Kurtis',
  'Men\'s Wear',
  'Kids Wear',
  'Blouse Materials',
  'Dhotis',
];

const CategoryList: React.FC = () => {
  return (
    <div className="category-list">
      <h2>Shop by Category</h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <a href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;