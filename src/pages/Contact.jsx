import React, { useState, useRef, useEffect } from 'react'
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaLeaf,
  FaSeedling,
  FaRecycle,
  FaShippingFast,
  FaUser,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaGithub,
  FaLinkedin
} from 'react-icons/fa'
import Loading from '../components/common/Loading/Loading'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgency: 'normal',
    contactMethod: 'email',
    subscribe: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [activeTab, setActiveTab] = useState('contact')
  const formRef = useRef(null)

  // Farm information
  const farmInfo = {
    name: "Green Valley Organic Farm",
    address: "123 Organic Way, Sustainable City, SC 12345",
    phone: "+1 (555) 123-4567",
    email: "hello@greenvalleyorganic.com",
    hours: {
      weekdays: "8:00 AM - 6:00 PM",
      weekends: "9:00 AM - 4:00 PM"
    }
  }

  // Team members - Updated with your team
  const teamMembers = [
    {
      id: 1,
      name: "Sayali More",
      role: "Project Lead & Full Stack Developer",
      email: "omore0087@gmail.com",
      phone: "+91 12345 67890",
      image: "/images/team/sayali.jpg",
      bio: "Leading the development team with expertise in both frontend and backend technologies. Ensures project delivery meets client requirements.",
      expertise: ["Project Management", "Full Stack Development", "Team Leadership"]
    },
    {
      id: 2,
      name: "Vaibhavi Avhale",
      role: "Frontend Developer & UI/UX Designer",
      email: "vaibhavi.avhale@example.com",
      phone: "+91 12345 67891",
      image: "/images/team/vaibhavi.jpg",
      bio: "Specializes in creating beautiful and responsive user interfaces with modern React.js and CSS frameworks.",
      expertise: ["React.js", "UI/UX Design", "Responsive Design"]
    },
    {
      id: 3,
      name: "Ravina Anawade",
      role: "Backend Developer & Database Specialist",
      email: "ravina.anawade@example.com",
      phone: "+91 12345 67892",
      image: "/images/team/ravina.jpg",
      bio: "Handles server-side logic, API development, and database management for robust application performance.",
      expertise: ["Node.js", "Database Management", "API Development"]
    },
    {
      id: 4,
      name: "Yash Baviskar",
      role: "Full Stack Developer & DevOps",
      email: "yash.baviskar@example.com",
      phone: "+91 12345 67893",
      image: "/images/team/yash.jpg",
      bio: "Works on full-stack development and deployment pipelines. Ensures smooth application deployment and maintenance.",
      expertise: ["Full Stack Development", "DevOps", "System Architecture"]
    }
  ]

  // FAQ data
  const faqItems = [
    {
      question: "Are all your products certified organic?",
      answer: "Yes! All our products are certified organic by the USDA. We maintain strict organic farming practices and undergo regular inspections to ensure compliance with organic standards."
    },
    {
      question: "Do you offer delivery services?",
      answer: "We offer delivery within a 50-mile radius of our farm. Delivery is free for orders over $50. For smaller orders, a $5.99 delivery fee applies. We deliver Tuesday through Saturday."
    },
    {
      question: "Can I visit the farm?",
      answer: "Absolutely! We offer farm tours every Saturday from 10 AM to 2 PM. Please book your tour in advance through our website. We also host seasonal events and workshops."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. For farm stand purchases, we also accept cash and local checks."
    },
    {
      question: "How do you handle returns or issues with products?",
      answer: "Customer satisfaction is our priority. If you're not completely satisfied with any product, contact us within 7 days for a full refund or replacement. We stand behind the quality of our organic produce."
    }
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate successful submission
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        urgency: 'normal',
        contactMethod: 'email',
        subscribe: false
      })
      
      // Reset form
      if (formRef.current) {
        formRef.current.reset()
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  // Auto-close success message after 5 seconds
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [submitStatus])

  return (
    <div className="contact-page">
      {/* Developer Credit - Top Right Corner */}
      <div className="developer-credit">
        <span>Developed by Krishna Patil Rajput</span>
        <div className="developer-links">
          <a href="https://github.com/krishnapr" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/krishnapr" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Get in Touch</h1>
            <p>We'd love to hear from you. Whether you have questions about our organic products, want to schedule a farm tour, or need support, our team is here to help.</p>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Navigation Tabs */}
        <div className="contact-tabs">
          <button 
            className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            Contact Us
          </button>
          <button 
            className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            Our Team
          </button>
          <button 
            className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            FAQ
          </button>
          <button 
            className={`tab-btn ${activeTab === 'visit' ? 'active' : ''}`}
            onClick={() => setActiveTab('visit')}
          >
            Visit Farm
          </button>
        </div>

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="contact-content">
            <div className="contact-layout">
              {/* Contact Form */}
              <div className="contact-form-section">
                <div className="section-header">
                  <h2>Send us a Message</h2>
                  <p>Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="status-message success">
                    <FaCheckCircle />
                    <div>
                      <h4>Message Sent Successfully!</h4>
                      <p>Thank you for contacting us. We'll get back to you soon.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="status-message error">
                    <FaExclamationTriangle />
                    <div>
                      <h4>Something went wrong</h4>
                      <p>Please try again or contact us directly at {farmInfo.phone}</p>
                    </div>
                  </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <div className="input-with-icon">
                        <FaUser />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <div className="input-with-icon">
                        <FaEnvelope />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <div className="input-with-icon">
                        <FaPhone />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="urgency">Urgency</label>
                      <select
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                      >
                        <option value="low">Low - General Inquiry</option>
                        <option value="normal">Normal - Within 24 hours</option>
                        <option value="high">High - Need immediate assistance</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="6"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Preferred Contact Method</label>
                      <div className="radio-group">
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="email"
                            checked={formData.contactMethod === 'email'}
                            onChange={handleInputChange}
                          />
                          <span>Email</span>
                        </label>
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="phone"
                            checked={formData.contactMethod === 'phone'}
                            onChange={handleInputChange}
                          />
                          <span>Phone</span>
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="checkbox-option">
                        <input
                          type="checkbox"
                          name="subscribe"
                          checked={formData.subscribe}
                          onChange={handleInputChange}
                        />
                        <span>Subscribe to our newsletter for farm updates and special offers</span>
                      </label>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loading size="small" />
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="contact-info-section">
                <div className="info-card">
                  <h3>Contact Information</h3>
                  
                  <div className="info-item">
                    <div className="info-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="info-content">
                      <h4>Visit Our Farm</h4>
                      <p>{farmInfo.address}</p>
                      <button className="directions-btn">
                        Get Directions
                      </button>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <FaPhone />
                    </div>
                    <div className="info-content">
                      <h4>Call Us</h4>
                      <p>{farmInfo.phone}</p>
                      <span className="info-note">Mon-Fri, 8AM-6PM</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <FaEnvelope />
                    </div>
                    <div className="info-content">
                      <h4>Email Us</h4>
                      <p>{farmInfo.email}</p>
                      <span className="info-note">We reply within 24 hours</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <FaClock />
                    </div>
                    <div className="info-content">
                      <h4>Business Hours</h4>
                      <div className="hours-list">
                        <div className="hours-item">
                          <span>Monday - Friday</span>
                          <span>{farmInfo.hours.weekdays}</span>
                        </div>
                        <div className="hours-item">
                          <span>Saturday - Sunday</span>
                          <span>{farmInfo.hours.weekends}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="social-section">
                    <h4>Follow Our Journey</h4>
                    <div className="social-links">
                      <a href="#" className="social-link facebook">
                        <FaFacebook />
                      </a>
                      <a href="#" className="social-link instagram">
                        <FaInstagram />
                      </a>
                      <a href="#" className="social-link twitter">
                        <FaTwitter />
                      </a>
                      <a href="#" className="social-link youtube">
                        <FaYoutube />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="stats-card">
                  <h4>Why Choose Us</h4>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <FaLeaf />
                      <span>100% Organic</span>
                    </div>
                    <div className="stat-item">
                      <FaSeedling />
                      <span>15+ Years Experience</span>
                    </div>
                    <div className="stat-item">
                      <FaRecycle />
                      <span>Sustainable Practices</span>
                    </div>
                    <div className="stat-item">
                      <FaShippingFast />
                      <span>Fresh Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="team-content">
            <div className="section-header centered">
              <h2>Meet Our Development Team</h2>
              <p>The talented developers behind Green Valley Organic Farm platform</p>
            </div>

            <div className="team-grid">
              {teamMembers.map(member => (
                <div key={member.id} className="team-card">
                  <div className="member-image">
                    <div className="member-avatar">
                      <FaUser />
                    </div>
                    <div className="member-overlay">
                      <div className="contact-links">
                        <a href={`mailto:${member.email}`}>
                          <FaEnvelope />
                        </a>
                        <a href={`tel:${member.phone}`}>
                          <FaPhone />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                    <p className="member-bio">{member.bio}</p>
                    <div className="member-expertise">
                      {member.expertise.map(skill => (
                        <span key={skill} className="expertise-tag">{skill}</span>
                      ))}
                    </div>
                    <div className="member-contact">
                      <a href={`mailto:${member.email}`}>{member.email}</a>
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Development Team Footer */}
            <div className="team-footer">
              <div className="development-info">
                <h4>Project Development</h4>
                <p>This platform was developed as a collaborative project by our dedicated team of developers. 
                   We're committed to creating sustainable digital solutions for organic farming communities.</p>
                <div className="tech-stack">
                  <span className="tech-tag">React.js</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">MongoDB</span>
                  <span className="tech-tag">CSS3</span>
                  <span className="tech-tag">JavaScript ES6+</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="faq-content">
            <div className="section-header centered">
              <h2>Frequently Asked Questions</h2>
              <p>Find quick answers to common questions about our organic farm and products.</p>
            </div>

            <div className="faq-list">
              {faqItems.map((faq, index) => (
                <div key={index} className={`faq-item ${openFaqIndex === index ? 'open' : ''}`}>
                  <button 
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-toggle">
                      {openFaqIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="faq-footer">
              <p>Still have questions? <button onClick={() => setActiveTab('contact')}>Contact us directly</button></p>
            </div>
          </div>
        )}

        {/* Visit Farm Tab */}
        {activeTab === 'visit' && (
          <div className="visit-content">
            <div className="section-header centered">
              <h2>Visit Our Farm</h2>
              <p>Experience the beauty of organic farming firsthand.</p>
            </div>

            <div className="visit-layout">
              <div className="visit-info">
                <h3>Farm Tour Information</h3>
                <div className="tour-details">
                  <div className="detail-item">
                    <h4>📍 Location</h4>
                    <p>{farmInfo.address}</p>
                  </div>
                  <div className="detail-item">
                    <h4>🕒 Tour Hours</h4>
                    <p>Saturday: 10:00 AM - 2:00 PM</p>
                    <p>Duration: Approximately 1.5 hours</p>
                  </div>
                  <div className="detail-item">
                    <h4>💰 Pricing</h4>
                    <p>Adults: $15 per person</p>
                    <p>Children (under 12): $8 per person</p>
                    <p>Family Package (2 adults + 2 children): $40</p>
                  </div>
                  <div className="detail-item">
                    <h4>📝 What to Expect</h4>
                    <ul>
                      <li>Guided tour of organic fields</li>
                      <li>Meet our farm animals</li>
                      <li>Seasonal harvesting experience</li>
                      <li>Organic tasting session</li>
                      <li>Q&A with our farmers</li>
                    </ul>
                  </div>
                </div>

                <div className="booking-cta">
                  <h4>Ready to Visit?</h4>
                  <p>Book your farm tour today and experience organic farming up close.</p>
                  <button className="book-tour-btn">
                    Book Farm Tour
                  </button>
                </div>
              </div>

              <div className="visit-map">
                <div className="map-placeholder">
                  <FaMapMarkerAlt />
                  <p>Interactive Map</p>
                  <span>Farm location and directions would be displayed here</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Contact