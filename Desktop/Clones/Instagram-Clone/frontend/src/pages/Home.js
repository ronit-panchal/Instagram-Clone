import React, { useEffect, useState } from 'react';
import '../pagescss/Home.css';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users') // ✅ Pointing to backend route
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <div className="home-container">
      <div className="carousel">
        {users.map(user => (
          <div key={user.id} className="carousel-item">
            <img src={user.avatar} alt={user.name} className="avatar" />
            <p className="username">{user.name}</p>
            <p className="caption">{user.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
