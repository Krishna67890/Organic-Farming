import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom' // Removed BrowserRouter
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { AppProvider } from './context/AppContext.jsx'
import Layout from './components/common/Layout/Layout'
import Loading from './components/common/Loading/Loading'
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop'
import './App.css'

// Lazy loading for better performance
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Farming = lazy(() => import('./pages/Farming'))
const Contact = lazy(() => import('./pages/Contact'))
const Blog = lazy(() => import('./pages/Blog'))
const Cart = lazy(() => import('./pages/Cart'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <ScrollToTop />
            <Layout>
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/farming" element={<Farming />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Layout>
          </div>
        </CartProvider>
      </AuthProvider>
    </AppProvider>
  )
}

export default App