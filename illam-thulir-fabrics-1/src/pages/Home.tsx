import React from 'react';
import Banner from '../components/Banner';
import CategoryList from '../components/CategoryList';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <Banner />
      <CategoryList />
      <Footer />
    </div>
  );
};

export default Home;