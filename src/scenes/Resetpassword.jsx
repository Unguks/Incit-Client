import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/user/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Password reset successful');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setError(result.message || 'Error resetting password');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Reset Password</h1>
      {error && <div className="mb-4 p-4 bg-red-200 text-red-800">{error}</div>}
      {success && <div className="mb-4 p-4 bg-green-200 text-green-800">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="old-password">Old Password</label>
          <input
            type="password"
            id="old-password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="confirm-password">Confirm New Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
