import { useState, useMemo } from 'react'

function LiveDataFilter() {
  // Sample data
  const [products] = useState([
    { id: 1, name: 'iPhone 14 Pro', category: 'Electronics', price: 999, brand: 'Apple', rating: 4.8, inStock: true },
    { id: 2, name: 'Samsung Galaxy S23', category: 'Electronics', price: 899, brand: 'Samsung', rating: 4.7, inStock: true },
    { id: 3, name: 'MacBook Pro', category: 'Electronics', price: 1999, brand: 'Apple', rating: 4.9, inStock: false },
    { id: 4, name: 'Dell XPS 15', category: 'Electronics', price: 1599, brand: 'Dell', rating: 4.6, inStock: true },
    { id: 5, name: 'Nike Air Max', category: 'Fashion', price: 129, brand: 'Nike', rating: 4.5, inStock: true },
    { id: 6, name: 'Adidas Ultraboost', category: 'Fashion', price: 180, brand: 'Adidas', rating: 4.7, inStock: true },
    { id: 7, name: 'Levi\'s Jeans', category: 'Fashion', price: 79, brand: 'Levi\'s', rating: 4.4, inStock: true },
    { id: 8, name: 'Sony WH-1000XM5', category: 'Electronics', price: 399, brand: 'Sony', rating: 4.8, inStock: false },
    { id: 9, name: 'Instant Pot', category: 'Home', price: 89, brand: 'Instant', rating: 4.6, inStock: true },
    { id: 10, name: 'Dyson Vacuum', category: 'Home', price: 599, brand: 'Dyson', rating: 4.7, inStock: true },
    { id: 11, name: 'KitchenAid Mixer', category: 'Home', price: 349, brand: 'KitchenAid', rating: 4.8, inStock: false },
    { id: 12, name: 'Ray-Ban Sunglasses', category: 'Fashion', price: 150, brand: 'Ray-Ban', rating: 4.5, inStock: true },
    { id: 13, name: 'iPad Air', category: 'Electronics', price: 599, brand: 'Apple', rating: 4.7, inStock: true },
    { id: 14, name: 'Bose QuietComfort', category: 'Electronics', price: 329, brand: 'Bose', rating: 4.6, inStock: true },
    { id: 15, name: 'North Face Jacket', category: 'Fashion', price: 199, brand: 'North Face', rating: 4.8, inStock: true }
  ])

  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [minRating, setMinRating] = useState(0)
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  // Get unique values for filters
  const categories = ['All', ...new Set(products.map(p => p.category))]
  const brands = ['All', ...new Set(products.map(p => p.brand))]

  // Filter and sort products using useMemo for performance
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesRating = product.rating >= minRating
      const matchesStock = !showInStockOnly || product.inStock

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesStock
    })

    // Sort
    filtered.sort((a, b) => {
      let compareValue = 0
      if (sortBy === 'name') {
        compareValue = a.name.localeCompare(b.name)
      } else if (sortBy === 'price') {
        compareValue = a.price - b.price
      } else if (sortBy === 'rating') {
        compareValue = a.rating - b.rating
      }
      return sortOrder === 'asc' ? compareValue : -compareValue
    })

    return filtered
  }, [products, searchTerm, selectedCategory, selectedBrand, priceRange, minRating, showInStockOnly, sortBy, sortOrder])

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
    setSelectedBrand('All')
    setPriceRange([0, 2000])
    setMinRating(0)
    setShowInStockOnly(false)
    setSortBy('name')
    setSortOrder('asc')
  }

  // Highlight search term
  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text
    const regex = new RegExp(`(${highlight})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, i) => 
      regex.test(part) ? <mark key={i}>{part}</mark> : part
    )
  }

  return (
    <div className="container my-4">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h2>🔍 Live Data Filtering</h2>
        </div>
        <div className="card-body">

          <div className="row">
            {/* Filters Sidebar */}
            <div className="col-md-3">
              <div className="card bg-light sticky-top">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">Filters</h5>
                    <button className="btn btn-sm btn-outline-secondary" onClick={resetFilters}>
                      Reset
                    </button>
                  </div>

                  {/* Search */}
                  <div className="mb-3">
                    <label className="form-label">Search</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Category */}
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select 
                      className="form-select"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Brand */}
                  <div className="mb-3">
                    <label className="form-label">Brand</label>
                    <select 
                      className="form-select"
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    >
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div className="mb-3">
                    <label className="form-label">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <div className="d-flex gap-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                      />
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-3">
                    <label className="form-label">
                      Minimum Rating: {minRating} ⭐
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={minRating}
                      onChange={(e) => setMinRating(+e.target.value)}
                    />
                  </div>

                  {/* In Stock */}
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inStock"
                        checked={showInStockOnly}
                        onChange={(e) => setShowInStockOnly(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="inStock">
                        In Stock Only
                      </label>
                    </div>
                  </div>

                  {/* Sort */}
                  <div className="mb-3">
                    <label className="form-label">Sort By</label>
                    <select 
                      className="form-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="name">Name</option>
                      <option value="price">Price</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <div className="btn-group w-100">
                      <button 
                        className={`btn btn-sm ${sortOrder === 'asc' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setSortOrder('asc')}
                      >
                        ↑ Ascending
                      </button>
                      <button 
                        className={`btn btn-sm ${sortOrder === 'desc' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setSortOrder('desc')}
                      >
                        ↓ Descending
                      </button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="alert alert-info">
                    <strong>Results:</strong> {filteredProducts.length} / {products.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Products List */}
            <div className="col-md-9">
              {filteredProducts.length === 0 ? (
                <div className="alert alert-warning">
                  <h5>😕 No products found</h5>
                  <p>Try adjusting your filters</p>
                </div>
              ) : (
                <div className="row g-3">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="col-md-6 col-lg-4">
                      <div className="card h-100 card-hover">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 className="card-title mb-0">
                              {highlightText(product.name, searchTerm)}
                            </h6>
                            {product.inStock ? (
                              <span className="badge bg-success">In Stock</span>
                            ) : (
                              <span className="badge bg-danger">Out of Stock</span>
                            )}
                          </div>
                          
                          <p className="text-muted small mb-2">
                            <strong>Category:</strong> {product.category}<br />
                            <strong>Brand:</strong> {product.brand}
                          </p>
                          
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="h5 mb-0 text-primary">${product.price}</span>
                            <span className="badge bg-warning text-dark">
                              ⭐ {product.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default LiveDataFilter
