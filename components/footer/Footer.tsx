import React from "react";

import "./../../styles/components.scss";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTiktok,
  IoLogoYoutube,
} from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="footer">
        <div className="main">
          <div className="container">
            <div className="content">
              <div className="footer-row">
                <div className="footer-column about-section">
                  <div className="about-content">
                    <h4>Connect with us</h4>
                    <ul className="social-icons">
                      <li>
                        <a
                          href="https://www.facebook.com/marchalestateRw"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IoLogoFacebook />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/marchal_estate"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IoLogoInstagram />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://x.com/MarchalEstateRw"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaXTwitter />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.tiktok.com/@marchalestate"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IoLogoTiktok />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/@marchalestate"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IoLogoYoutube />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="footer-column explore-section">
                  <h4>Explore</h4>
                  <ul className="links">
                    <li>
                      <Link href="/buy-property-list-sidebar">Listings</Link>
                    </li>
                    <li>
                      <Link href="/register">Register</Link>
                    </li>
                    <li>
                      <Link href="/login">Login</Link>
                    </li>
                    <li>
                      <Link href="/updates">Updates</Link>
                    </li>
                    <li>
                      <Link href="/agents">Agents</Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-column category-section">
                  <h4>Categories</h4>
                  <ul className="links">
                    <li>
                      <Link href="/search-properties">Plot</Link>
                    </li>
                    <li>
                      <Link href="/search-properties">Residential</Link>
                    </li>
                    <li>
                      <Link href="/search-properties?categories%5B0%5D=Villa">
                        Villa
                      </Link>
                    </li>
                    <li>
                      <Link href="/search-properties?categories%5B0%5D=Commercial">
                        Commercial
                      </Link>
                    </li>
                    <li>
                      <Link href="/search-properties?categories%5B0%5D=Apartment">
                        Apartment
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-column location-section">
                  <h4>Locations</h4>
                  <ul className="links">
                    <li>
                      <Link href="">Rwanda</Link>
                    </li>
                    <li>
                      <Link href="">Kenya</Link>
                    </li>
                    <li>
                      <Link href="">Burundi</Link>
                    </li>
                    <li>
                      <Link href="">UAE</Link>
                    </li>
                    <li>
                      <Link href="">Zambia</Link>
                    </li>
                  </ul>
                </div>
                <div className="footer-column quick-links-section">
                  <h4>Quick Links</h4>
                  <ul className="links">
                    <li>
                      <Link href="/about-us">About</Link>
                    </li>
                    <li>
                      <Link href="">FAQ</Link>
                    </li>
                    <li>
                      <Link href="">Terms & Conditions</Link>
                    </li>
                    <li>
                      <Link href="">NLA</Link>
                    </li>
                    <li>
                      <Link href="">RDB</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="container">
            <div className="content">
              <div className="left">
                <p>&copy; {year} Eja Real Estate Ltd.</p>
                <p>All Rights Reserved.</p>
              </div>
              <div>
                <p>Own Affordable Properties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
