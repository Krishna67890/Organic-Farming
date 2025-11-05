import React from 'react';
import { FaLeaf, FaUser, FaUniversity, FaMedkit, FaSeedling, FaHeart, FaAward, FaUsers } from 'react-icons/fa';
import './AboutUs.css';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Sayali More",
      role: "Project Lead",
      description: "Oversees project development and client coordination"
    },
    {
      name: "Vaibhavi Avhale",
      role: "Frontend Developer",
      description: "Specializes in UI/UX design and user experience"
    },
    {
      name: "Ravina Anawade",
      role: "Backend Developer",
      description: "Handles server-side logic and database management"
    },
    {
      name: "Yash Baviskar",
      role: "Full Stack Developer",
      description: "Works on both frontend and backend integration"
    }
  ];

  const features = [
    {
      icon: <FaMedkit />,
      title: "Organic Medicines",
      description: "Natural herbal remedies and Ayurvedic medicines sourced directly from certified organic farms"
    },
    {
      icon: <FaSeedling />,
      title: "Farming Products",
      description: "Complete range of organic seeds, fertilizers, and farming equipment for sustainable agriculture"
    },
    {
      icon: <FaLeaf />,
      title: "Fresh Produce",
      description: "Direct-from-farm fresh vegetables, fruits, and dairy products delivered to your doorstep"
    },
    {
      icon: <FaHeart />,
      title: "Health & Wellness",
      description: "Wellness products and dietary supplements for a healthy organic lifestyle"
    }
  ];

  return (
    <div className="about-us-page">
      {/* Developer Credit - Top Right Corner */}
      <div className="developer-credit">
        <span>Developed by Krishna Patil Rajput</span>
      </div>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <FaLeaf className="title-icon" />
              About Organic Farm
            </h1>
            <p className="hero-subtitle">
              Bridging Traditional Farming with Modern Healthcare
            </p>
            <div className="hero-description">
              <p>
                In collaboration with <strong>Matoshri College of Engineering and Research Centre</strong>, 
                we are pioneering a revolutionary approach to healthcare and agriculture. Our platform 
                integrates organic farming practices with natural medicine distribution, creating a 
                sustainable ecosystem for health-conscious consumers.
              </p>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-cards">
              <div className="card medicine-card">
                <FaMedkit />
                <span>Organic Medicines</span>
              </div>
              <div className="card farming-card">
                <FaSeedling />
                <span>Farming Products</span>
              </div>
              <div className="card health-card">
                <FaHeart />
                <span>Wellness Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <h2>Our Mission</h2>
              <p>
                To provide 100% organic farming products and natural medicines that promote 
                sustainable agriculture and holistic healthcare. We believe in the power of 
                nature to heal and nourish both people and the planet.
              </p>
            </div>
            <div className="mission-card">
              <h2>Our Vision</h2>
              <p>
                Creating a world where organic farming and natural medicine are accessible 
                to everyone, fostering healthier communities and a more sustainable environment 
                for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">What We Offer</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <FaUsers className="section-icon" />
            <h2 className="section-title">Our Team</h2>
            <p className="section-subtitle">
              Dedicated students from Matoshri College of Engineering and Research Centre
            </p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-avatar">
                  <FaUser />
                </div>
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* College Section */}
      <section className="college-section">
        <div className="container">
          <div className="college-content">
            <div className="college-icon">
              <FaUniversity />
            </div>
            <div className="college-text">
              <h2>Matoshri College of Engineering and Research Centre</h2>
              <p>
                Our esteemed client and educational partner, fostering innovation and research 
                in sustainable technologies and healthcare solutions. This project represents 
                the collaborative spirit between industry and academia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Organic Products</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">Herbal Medicines</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Natural Ingredients</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;