import React from 'react'
import ProductCard from '../../products/ProductCard/ProductCard'
import Loading from '../../common/Loading/Loading'
import './SeasonalProducts.css'

const SeasonalProducts = ({ products, season, loading, onQuickAdd }) => {
  const seasonNames = {
    spring: 'Spring',
    summer: 'Summer',
    autumn: 'Autumn',
    winter: 'Winter'
  }

  if (loading) {
    return (
      <section className="seasonal-products">
        <div className="container">
          <Loading />
        </div>
      </section>
    )
  }

  return (
    <section className="seasonal-products">
      <div className="container">
        <div className="section-header">
          <h2>{seasonNames[season]} Specials</h2>
          <p>Fresh seasonal picks available now</p>
        </div>
        {products.length > 0 ? (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>No seasonal products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default SeasonalProducts