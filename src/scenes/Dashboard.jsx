import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/user/dashboard', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => setDashboardData(data))
      .catch(error => console.error('Error fetching dashboard data:', error));
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/login'); 
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <Link to="/dashboard"
        className="mb-6 px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Profile
      </Link>
      <Link to="/reset-password" className="mb-6 px-4 py-2 bg-yellow-500 text-white rounded-md">
        Reset Password
      </Link>
      <button
        onClick={handleLogout}
        className="mb-6 px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Logout
      </button>
      <div className="mb-4">
        <p>Total Users: {dashboardData.totalUsers}</p>
        <p>Active Users Today: {dashboardData.activeUsersToday}</p>
        <p>Average Active Users (Last 7 Days): {dashboardData.averageActiveUsersLast7Days.toFixed(2)}</p>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Email</th>
            <th className="py-2">Name</th>
            <th className="py-2">Sign Up Date</th>
            <th className="py-2">Login Count</th>
            <th className="py-2">Last Logout</th>
          </tr>
        </thead>
        <tbody>
          {dashboardData.users.map(user => (
            <tr key={user.email}>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{new Date(user.signUpTimestamp).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{user.loginCount}</td>
              <td className="border px-4 py-2">{user.lastLogoutTimestamp ? new Date(user.lastLogoutTimestamp).toLocaleDateString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
