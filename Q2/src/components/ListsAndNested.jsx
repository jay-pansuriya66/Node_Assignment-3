import { useState } from 'react'

// Nested component: Product item
function ProductItem({ product, onAddToCart }) {
  return (
    <div className="card h-100 card-hover">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title">{product.name}</h5>
          <span className="badge bg-primary">${product.price}</span>
        </div>
        <p className="card-text text-muted">{product.category}</p>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">Stock: {product.stock}</small>
          <button 
            className="btn btn-sm btn-success"
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

// Nested component: Category section
function CategorySection({ category, products, onAddToCart }) {
  return (
    <div className="mb-4">
      <h4 className="mb-3">
        <span className="badge bg-secondary">{category}</span>
      </h4>
      <div className="row g-3">
        {products.map(product => (
          <div key={product.id} className="col-md-4">
            <ProductItem product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </div>
  )
}

// Nested component: Comment with replies
function Comment({ comment, level = 0 }) {
  return (
    <div className={`mb-3 ${level > 0 ? 'ms-4' : ''}`}>
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-start">
            <div className="me-3">
              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" 
                   style={{ width: '40px', height: '40px' }}>
                {comment.author[0]}
              </div>
            </div>
            <div className="flex-grow-1">
              <h6 className="mb-1">{comment.author}</h6>
              <p className="mb-1">{comment.text}</p>
              <small className="text-muted">{comment.date}</small>
            </div>
          </div>
        </div>
      </div>
      
      {/* Nested replies (recursive) */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map(reply => (
            <Comment key={reply.id} comment={reply} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

function ListsAndNested() {
  const [cart, setCart] = useState([])

  // Sample products data
  const products = [
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics', stock: 5 },
    { id: 2, name: 'Mouse', price: 29, category: 'Electronics', stock: 15 },
    { id: 3, name: 'Keyboard', price: 79, category: 'Electronics', stock: 10 },
    { id: 4, name: 'T-Shirt', price: 19, category: 'Clothing', stock: 20 },
    { id: 5, name: 'Jeans', price: 49, category: 'Clothing', stock: 12 },
    { id: 6, name: 'Sneakers', price: 89, category: 'Clothing', stock: 8 },
    { id: 7, name: 'Coffee Maker', price: 59, category: 'Home', stock: 7 },
    { id: 8, name: 'Blender', price: 39, category: 'Home', stock: 0 },
    { id: 9, name: 'Toaster', price: 25, category: 'Home', stock: 14 }
  ]

  // Nested comments data
  const comments = [
    {
      id: 1,
      author: 'Alice',
      text: 'Great product! Highly recommended.',
      date: '2 hours ago',
      replies: [
        {
          id: 2,
          author: 'Bob',
          text: 'I agree! Been using it for a month.',
          date: '1 hour ago',
          replies: [
            {
              id: 3,
              author: 'Charlie',
              text: 'How is the battery life?',
              date: '30 mins ago',
              replies: []
            }
          ]
        },
        {
          id: 4,
          author: 'Diana',
          text: 'Thanks for the review!',
          date: '45 mins ago',
          replies: []
        }
      ]
    },
    {
      id: 5,
      author: 'Eve',
      text: 'Does it come with warranty?',
      date: '3 hours ago',
      replies: [
        {
          id: 6,
          author: 'Frank',
          text: 'Yes, 1 year manufacturer warranty.',
          date: '2 hours ago',
          replies: []
        }
      ]
    }
  ]

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = []
    }
    acc[product.category].push(product)
    return acc
  }, {})

  const handleAddToCart = (product) => {
    setCart([...cart, product])
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0)
  }

  return (
    <div className="container my-4">
      <div className="card shadow-lg">
        <div className="card-header bg-success text-white">
          <h2>📋 Lists & Nested Components</h2>
        </div>
        <div className="card-body">
          
          {/* Cart Summary */}
          <div className="alert alert-info d-flex justify-content-between align-items-center">
            <span>🛒 Cart Items: {cart.length}</span>
            <span className="fw-bold">Total: ${getTotalPrice()}</span>
          </div>

          {/* Simple List */}
          <section className="mb-5">
            <h4 className="mb-3">1. Simple List Rendering</h4>
            <div className="card bg-light">
              <div className="card-body">
                <h5>All Products ({products.length})</h5>
                <ul className="list-group">
                  {products.map(product => (
                    <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                      {product.name}
                      <span className="badge bg-primary rounded-pill">${product.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Nested Components with Grouped Data */}
          <section className="mb-5">
            <h4 className="mb-3">2. Nested Components (Grouped Products)</h4>
            {Object.keys(groupedProducts).map(category => (
              <CategorySection 
                key={category}
                category={category}
                products={groupedProducts[category]}
                onAddToCart={handleAddToCart}
              />
            ))}
          </section>

          {/* Nested Comments (Recursive) */}
          <section className="mb-5">
            <h4 className="mb-3">3. Nested Comments (Recursive)</h4>
            <div className="card bg-light">
              <div className="card-body">
                <h5 className="mb-4">💬 Comments Section</h5>
                {comments.map(comment => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </div>
            </div>
          </section>

          {/* Shopping Cart List */}
          <section>
            <h4 className="mb-3">4. Cart Items (Dynamic List)</h4>
            <div className="card">
              <div className="card-body">
                {cart.length === 0 ? (
                  <p className="text-muted text-center">Your cart is empty</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Product</th>
                          <th>Category</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>${item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="table-primary">
                          <td colSpan="3" className="text-end fw-bold">Total:</td>
                          <td className="fw-bold">${getTotalPrice()}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

export default ListsAndNested
