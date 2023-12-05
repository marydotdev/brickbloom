'use client'

import { useState, useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("/api/getProducts")
      .then((response) => response.json())
      .then((data) => setProducts(data.data));
  }, [])

  console.log(products)

  return (
    <div>
      <h1>Brickbloom</h1>
      <UserButton afterSignOutUrl="/" />

      <a href="https://buy.stripe.com/test_6oEaFj8gHfLd54A000">Buy Credits</a>

      <div>
        {products.map((product, index) => (
          <div key={index}>
            <h2>{product.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
