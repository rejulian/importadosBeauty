import React, { useEffect, useState } from 'react'
import './Home.css'
import { db } from '../../../firebaseConfig';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import ItemList from '../ItemList/ItemList';
import { ClipLoader } from 'react-spinners';

const Home = () => {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const refCollection = collection(db, "products");

  const getProducts = async () => {
    setIsLoading(true)
    try {
      let productsQuery = query(refCollection, where("promote", "==", true))
      const response = await getDocs(productsQuery);
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
    getProducts()
  }, [])

  return (
    <main>
      <section id='hero'>
        <p>¡BIENVENIDOS!</p>
        <h1>ImportadosBeauty SN</h1>
        <h2>productos del exterior a tu alcance</h2>
      </section>
      <div id='main'>
        {
          isLoading ? <ClipLoader color="#ffc1c1" loading={isLoading} size={70} /> :
            <>
              <h1>Lo más destacado</h1>
              <Swiper
                className='mySwiper'
                slidesPerView={4}
                spaceBetween={20}
                pagination={{ clickable: true }}
                modules={[Pagination, Navigation]}
                breakpoints={{
                  0: {
                    slidesPerView: 2,
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
                {products.map(product => (
                  <SwiperSlide key={product.id} >
                    <ItemList product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
        }
      </div>
    </main>
  )
}

export default Home