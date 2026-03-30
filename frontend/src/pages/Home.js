import React from 'react';
import Navigationbar from '../component/Navigationbar';
import './Home.css';

export default function Home() {
  return (
    <div>
      <Navigationbar />

      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="mm1">
          WELCOME <br />
          TO <br />
          SERENDIB NEWS
        </h1>

        {/* Description */}
        <div className="home-description">
          <p>
            Welcome to <strong>Serendib News</strong>, your trusted digital news platform delivering the latest and most accurate information from <b>Sri Lanka</b> and around the world.
          </p>

          <p>Stay informed with our three main news categories:</p>

          <ul>
            <li><strong>Local News</strong> – covering important events, politics, and updates from across Sri Lanka</li>
            <li><strong>Foreign News</strong> – bringing you global stories and international developments</li>
            <li><strong>Sports News</strong> – providing updates on local and international sports</li>
          </ul>

          <p>
            Our platform is designed for everyone to read and stay updated with current events. Readers can freely explore all news content without any restrictions.
          </p>

          <p>
            To maintain quality and security, commenting and interaction features are available only for registered users. By signing in, users can engage more actively with the platform.
          </p>

          <p>
            For our content creators and journalists, Serendib News offers powerful tools to:
          </p>
          <ul>
            <li>Add new news articles</li>
            <li>Edit existing posts</li>
            <li>Manage and organize content efficiently</li>
          </ul>

          <p>
            Serendib News aims to deliver fast, reliable, and well-structured news in a modern and user-friendly environment.
          </p>
        </div>
      </div>
    </div>
  );
}