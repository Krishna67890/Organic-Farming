import React, { useState, useEffect, useMemo } from 'react'
import { 
  FaSearch, 
  FaCalendar, 
  FaUser, 
  FaClock, 
  FaTags, 
  FaArrowRight,
  FaShare,
  FaBookmark,
  FaRegBookmark,
  FaFilter,
  FaTimes,
  FaSeedling,
  FaLeaf,
  FaRecycle,
  FaUtensils
} from 'react-icons/fa'
import { Link, useSearchParams } from 'react-router-dom'
import Loading from '../components/common/Loading/Loading'
import Newsletter from '../components/home/Newsletter/Newsletter'
import './Blog.css'

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [articles, setArticles] = useState([])
  const [featuredArticles, setFeaturedArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || '')
  const [bookmarkedArticles, setBookmarkedArticles] = useState(new Set())
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list' | 'masonry'

  // Blog categories
  const categories = [
    { id: 'farming-tips', name: 'Farming Tips', icon: FaSeedling, count: 12 },
    { id: 'organic-living', name: 'Organic Living', icon: FaLeaf, count: 8 },
    { id: 'sustainability', name: 'Sustainability', icon: FaRecycle, count: 6 },
    { id: 'recipes', name: 'Recipes', icon: FaUtensils, count: 10 },
    { id: 'news', name: 'Farm News', icon: FaCalendar, count: 5 }
  ]

  // Popular tags
  const popularTags = [
    'Organic Farming', 'Composting', 'Seasonal', 'Vegetables', 
    'Sustainable', 'Healthy Eating', 'Garden Tips', 'Farm Life',
    'Natural Pest Control', 'Harvesting'
  ]

  // Mock data - in real app, this would come from API
  const mockArticles = [
    {
      id: 1,
      title: "The Complete Guide to Organic Composting",
      excerpt: "Learn how to create nutrient-rich compost for your organic farm using simple techniques and household waste.",
      content: "Full article content here...",
      author: "Sarah Green",
      publishDate: "2024-01-15",
      readTime: "8 min read",
      category: "farming-tips",
      tags: ["Composting", "Organic Farming", "Sustainability"],
      image: "/images/blog/composting-guide.jpg",
      featured: true,
      views: 1247,
      likes: 89,
      comments: 23
    },
    {
      id: 2,
      title: "Seasonal Planting Calendar for Organic Vegetables",
      excerpt: "Maximize your harvest with our comprehensive seasonal planting guide tailored for organic growers.",
      content: "Full article content here...",
      author: "Mike Farmer",
      publishDate: "2024-01-12",
      readTime: "6 min read",
      category: "farming-tips",
      tags: ["Seasonal", "Vegetables", "Planting"],
      image: "/images/blog/planting-calendar.jpg",
      featured: true,
      views: 892,
      likes: 67,
      comments: 15
    },
    {
      id: 3,
      title: "5 Benefits of Eating Organic Produce",
      excerpt: "Discover the health and environmental benefits of choosing organic fruits and vegetables.",
      content: "Full article content here...",
      author: "Dr. Lisa Health",
      publishDate: "2024-01-10",
      readTime: "5 min read",
      category: "organic-living",
      tags: ["Healthy Eating", "Nutrition", "Organic Benefits"],
      image: "/images/blog/organic-benefits.jpg",
      featured: false,
      views: 1563,
      likes: 124,
      comments: 31
    },
    {
      id: 4,
      title: "Natural Pest Control Methods for Your Garden",
      excerpt: "Effective and eco-friendly ways to protect your plants from pests without harmful chemicals.",
      content: "Full article content here...",
      author: "Tom Gardener",
      publishDate: "2024-01-08",
      readTime: "7 min read",
      category: "farming-tips",
      tags: ["Natural Pest Control", "Garden Tips", "Eco-friendly"],
      image: "/images/blog/pest-control.jpg",
      featured: false,
      views: 734,
      likes: 45,
      comments: 12
    },
    {
      id: 5,
      title: "Farm-to-Table: Fresh Organic Recipes",
      excerpt: "Delicious recipes using fresh organic ingredients straight from the farm to your kitchen.",
      content: "Full article content here...",
      author: "Chef Maria Fresh",
      publishDate: "2024-01-05",
      readTime: "10 min read",
      category: "recipes",
      tags: ["Recipes", "Cooking", "Farm-to-Table"],
      image: "/images/blog/recipes.jpg",
      featured: true,
      views: 2105,
      likes: 156,
      comments: 42
    },
    {
      id: 6,
      title: "Sustainable Water Management in Organic Farming",
      excerpt: "Learn water conservation techniques that help preserve this precious resource while maintaining healthy crops.",
      content: "Full article content here...",
      author: "Water Expert",
      publishDate: "2024-01-03",
      readTime: "9 min read",
      category: "sustainability",
      tags: ["Water Management", "Sustainability", "Conservation"],
      image: "/images/blog/water-management.jpg",
      featured: false,
      views: 621,
      likes: 38,
      comments: 8
    }
  ]

  // Simulate API call
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true)
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setArticles(mockArticles)
        setFeaturedArticles(mockArticles.filter(article => article.featured))
      } catch (error) {
        console.error('Error loading articles:', error)
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [])

  // Filter articles based on search and filters
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === '' || article.category === selectedCategory
      const matchesTag = selectedTag === '' || article.tags.includes(selectedTag)

      return matchesSearch && matchesCategory && matchesTag
    })
  }, [articles, searchQuery, selectedCategory, selectedTag])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedTag) params.set('tag', selectedTag)
    
    setSearchParams(params)
  }, [searchQuery, selectedCategory, selectedTag, setSearchParams])

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  // Handle category filter
  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(prev => prev === categoryId ? '' : categoryId)
  }

  // Handle tag filter
  const handleTagFilter = (tag) => {
    setSelectedTag(prev => prev === tag ? '' : tag)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedTag('')
  }

  // Toggle bookmark
  const toggleBookmark = (articleId) => {
    setBookmarkedArticles(prev => {
      const newBookmarks = new Set(prev)
      if (newBookmarks.has(articleId)) {
        newBookmarks.delete(articleId)
      } else {
        newBookmarks.add(articleId)
      }
      return newBookmarks
    })
  }

  // Share article
  const shareArticle = async (article) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: `/blog/${article.id}`,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/blog/${article.id}`)
      alert('Link copied to clipboard!')
    }
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Get active filter count
  const activeFilterCount = [searchQuery, selectedCategory, selectedTag].filter(Boolean).length

  // Render article card
  const renderArticleCard = (article, variant = 'default') => {
    const isBookmarked = bookmarkedArticles.has(article.id)
    const CategoryIcon = categories.find(cat => cat.id === article.category)?.icon || FaSeedling

    return (
      <article key={article.id} className={`article-card ${variant}`}>
        <div className="article-image">
          <img src={article.image} alt={article.title} />
          <div className="article-category">
            <CategoryIcon />
            <span>{categories.find(cat => cat.id === article.category)?.name}</span>
          </div>
          <div className="article-actions">
            <button 
              className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={() => toggleBookmark(article.id)}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
            >
              {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </button>
            <button 
              className="share-btn"
              onClick={() => shareArticle(article)}
              aria-label="Share article"
            >
              <FaShare />
            </button>
          </div>
        </div>

        <div className="article-content">
          <div className="article-meta">
            <span className="meta-item">
              <FaUser />
              {article.author}
            </span>
            <span className="meta-item">
              <FaCalendar />
              {formatDate(article.publishDate)}
            </span>
            <span className="meta-item">
              <FaClock />
              {article.readTime}
            </span>
          </div>

          <h3 className="article-title">
            <Link to={`/blog/${article.id}`}>{article.title}</Link>
          </h3>

          <p className="article-excerpt">{article.excerpt}</p>

          <div className="article-tags">
            {article.tags.map(tag => (
              <button
                key={tag}
                className={`tag ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => handleTagFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="article-stats">
            <div className="stat">
              <span className="stat-value">{article.views}</span>
              <span className="stat-label">Views</span>
            </div>
            <div className="stat">
              <span className="stat-value">{article.likes}</span>
              <span className="stat-label">Likes</span>
            </div>
            <div className="stat">
              <span className="stat-value">{article.comments}</span>
              <span className="stat-label">Comments</span>
            </div>
          </div>

          <Link to={`/blog/${article.id}`} className="read-more">
            Read More <FaArrowRight />
          </Link>
        </div>
      </article>
    )
  }

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Organic Farming Blog</h1>
            <p>Discover tips, stories, and insights from our organic farming journey. Learn about sustainable practices, healthy recipes, and farm life.</p>
            
            {/* Search Bar */}
            <div className="blog-search">
              <div className="search-input-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button 
                    className="clear-search"
                    onClick={() => setSearchQuery('')}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {!loading && featuredArticles.length > 0 && (
        <section className="featured-articles">
          <div className="container">
            <h2 className="section-title">Featured Articles</h2>
            <div className="featured-grid">
              {featuredArticles.map(article => renderArticleCard(article, 'featured'))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="blog-main">
        <div className="container">
          <div className="blog-layout">
            {/* Sidebar */}
            <aside className="blog-sidebar">
              {/* Categories */}
              <div className="sidebar-widget">
                <h3>Categories</h3>
                <div className="categories-list">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                      onClick={() => handleCategoryFilter(category.id)}
                    >
                      <category.icon />
                      <span className="category-name">{category.name}</span>
                      <span className="category-count">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="sidebar-widget">
                <h3>Popular Tags</h3>
                <div className="tags-cloud">
                  {popularTags.map(tag => (
                    <button
                      key={tag}
                      className={`tag ${selectedTag === tag ? 'active' : ''}`}
                      onClick={() => handleTagFilter(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="sidebar-widget">
                <Newsletter variant="compact" />
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="blog-content">
              {/* Content Header */}
              <div className="content-header">
                <div className="header-info">
                  <h2>
                    {selectedCategory 
                      ? categories.find(cat => cat.id === selectedCategory)?.name
                      : selectedTag
                      ? `Tag: ${selectedTag}`
                      : searchQuery
                      ? `Search: "${searchQuery}"`
                      : 'All Articles'
                    }
                  </h2>
                  <p className="results-count">
                    {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
                  </p>
                </div>

                <div className="header-controls">
                  {/* View Mode Toggle */}
                  <div className="view-toggle">
                    <button
                      className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid view"
                    >
                      Grid
                    </button>
                    <button
                      className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                      onClick={() => setViewMode('list')}
                      aria-label="List view"
                    >
                      List
                    </button>
                    <button
                      className={`view-btn ${viewMode === 'masonry' ? 'active' : ''}`}
                      onClick={() => setViewMode('masonry')}
                      aria-label="Masonry view"
                    >
                      Masonry
                    </button>
                  </div>

                  {/* Active Filters */}
                  {activeFilterCount > 0 && (
                    <button className="clear-filters" onClick={clearFilters}>
                      <FaTimes />
                      Clear Filters ({activeFilterCount})
                    </button>
                  )}
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="loading-section">
                  <Loading />
                  <p>Loading articles...</p>
                </div>
              )}

              {/* Articles Grid */}
              {!loading && (
                <>
                  {filteredArticles.length > 0 ? (
                    <div className={`articles-grid ${viewMode}`}>
                      {filteredArticles.map(article => renderArticleCard(article))}
                    </div>
                  ) : (
                    <div className="no-results">
                      <FaSearch className="no-results-icon" />
                      <h3>No articles found</h3>
                      <p>Try adjusting your search or filters to find what you're looking for.</p>
                      <button className="clear-all-btn" onClick={clearFilters}>
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Load More Button */}
              {!loading && filteredArticles.length > 0 && (
                <div className="load-more-section">
                  <button className="load-more-btn">
                    Load More Articles
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="blog-newsletter">
        <div className="container">
          <Newsletter />
        </div>
      </section>
    </div>
  )
}

export default Blog