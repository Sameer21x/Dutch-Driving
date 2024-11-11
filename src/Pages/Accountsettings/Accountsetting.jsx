import React, { useState, useRef } from 'react';
import '../Accountsettings/Accountsetting.css';
import { Eye, EyeOff, Pencil, ChevronDown, LogOut } from 'lucide-react';
import defaultAvatar from '../../assets/imgs/avatar.png';
// import logo from '../../assets/imgs/totc-logo.png';

export default function AccountSettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: 'Lina',
    email: 'lisa@gmail.com',
    password: '••••••••'
  });
  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="account-settings-page">
      <header className="header">
  <div className="header-content">
    <div className="logo">
      {/* <img src={logo} alt="TOTC Logo" /> */}
      <span>TOTC</span>
    </div>
    
    <div className="header-right">
      <a href="/about" className="about-link">About Us</a>
      <div className="user-profile">
        <img src={profileImage} alt="User avatar" className="user-avatar" />
        <span className="username">Lina</span>
        <div className="header-icons">
          <ChevronDown size={20} />
          <LogOut size={20} />
        </div>
      </div>
    </div>
  </div>
</header>

      <div className="account-settings">
        <div className="title-container">
          <h1>Account Settings</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="profile-image-container">
            <div className="profile-image" onClick={handleImageClick}>
              <img src={profileImage} alt="Profile" />
              <div className="edit-overlay">Edit photo</div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <div className="input-container">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <Pencil className="edit-icon" size={20} />
            </div>
          </div>

          <div className="form-group">
            <label>Email address</label>
            <div className="input-container">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Pencil className="edit-icon" size={20} />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <Pencil className="edit-icon" size={20} />
            </div>
          </div>

          <button type="submit" className="save-button">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}