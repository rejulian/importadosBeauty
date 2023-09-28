import React, { useEffect, useState } from 'react';
import ItemList from './ItemList';
import { ClipLoader } from 'react-spinners';
import { db } from '../../../firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';


const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const refCollection = collection(db, "products");

  async function getProducts() {
    try {
      const response = await getDocs(refCollection);
      const productsArr = response.docs.map(product => {
        return { ...product.data(), id: product.id };
      });
      setProducts(productsArr);
      setIsLoading(false)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main id='shop'>
      {isLoading ? (
        <div className="loading-spinner">
          <ClipLoader color="#ffc1c1" loading={isLoading} size={70} />
        </div>
      ) : (
        <>
          <h1>Body Splash</h1>
          <Swiper
            className='mySwiper'
            slidesPerView={4}
            spaceBetween={20}
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 0
              },
              790: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1020: {
                slidesPerView: 4,
                spaceBetween: 20,
              },

            }}
          >
            {products.map(product => (
              <SwiperSlide key={product.id} >
                <ItemList product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )
      }
    </main>
  );
};

export default ItemListContainer;
