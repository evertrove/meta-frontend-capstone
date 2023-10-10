import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-scroll';

const socials = [
  { icon: faGithub, link: 'https://github.com/evertrove' },
  { icon: faLinkedin, link: 'https://linkedin.com/in/your-linkedin-link' },
];

function Header() {
  const handleClick = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="header">
      <nav className="nav">
        <div className="nav__logo">Your Name</div>
        <ul className="nav__social">
          {socials.map((social, index) => (
            <li key={index}>
              <a href={social.link} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={social.icon} size="2x" />
              </a>
            </li>
          ))}
        </ul>
        <ul className="nav__links">
          <li>
            <Link
              to="projects-section"
              smooth={true}
              onClick={() => handleClick('projects-section')}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="contactme-section"
              smooth={true}
              onClick={() => handleClick('contactme-section')}
            >
              Contact Me
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

