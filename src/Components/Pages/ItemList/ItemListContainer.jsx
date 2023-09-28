import React, { useEffect, useState } from 'react';
import ItemList from './ItemList';
import { ClipLoader } from 'react-spinners';
import { db } from '../../../firebaseConfig';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';


const ItemListContainer = () => {
  const [bodySplash, setBodySplash] = useState([]);
  const [lotion, setLotion] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const refCollection = collection(db, "products");

  async function getBodySplash() {
    try {
      let bodySplashQuery = query(refCollection, where("category", "==", "Body Splash"))
      const response = await getDocs(bodySplashQuery);
      const productsArr = response.docs.map(product => {
        return { ...product.data(), id: product.id };
      });
      setBodySplash(productsArr);
      setIsLoading(false)
    } catch (error) {
      console.error(error);
    }
  }

  async function getLotion() {
    try {
      let lotionQuery = query(refCollection, where("category", "==", "Lotion"))
      const response = await getDocs(lotionQuery);
      const productsArr = response.docs.map(product => {
        return { ...product.data(), id: product.id };
      });
      setLotion(productsArr);
      setIsLoading(false)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBodySplash();
    getLotion()
  }, []);

  return (
    <main id='shop'>
      {isLoading ? (
        <div className="loading-spinner">
          <ClipLoader color="#ffc1c1" loading={isLoading} size={70} />
        </div>
      ) : (
        <>
          {
            bodySplash.length > 0 && (
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
                      slidesPerView: 1,
                      spaceBetween: 10
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
                  {bodySplash.map(product => (
                    <SwiperSlide key={product.id} >
                      <ItemList product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            )
          }

          {
            lotion.length > 0 && (
              <>
                <h1>Cremas</h1>
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
                  {lotion.map(product => (
                    <SwiperSlide key={product.id} >
                      <ItemList product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            )
          }
        </>
      )
      }
    </main>
  );
};

export default ItemListContainer;
