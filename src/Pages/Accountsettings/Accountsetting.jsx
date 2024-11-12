import React, { useState, useRef } from 'react';
import '../Accountsettings/Accountsetting.css';
import { Eye, EyeOff, Pencil, ChevronDown, LogOut } from 'lucide-react';
import defaultAvatar from '../../assets/imgs/avatar.png';
import profilepic from '../../assets/imgs/profilepic.png'

export default function AccountSettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: 'Lina',
    email: 'lisa@gmail.com',
    password: '••••••••'
  });
  const [editableFields, setEditableFields] = useState({
    username: false,
    email: false,
    password: false
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
    if (editableFields[name]) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const toggleEditable = (field) => {
    setEditableFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedData = Object.keys(editableFields).reduce((acc, field) => {
      if (editableFields[field]) {
        acc[field] = formData[field];
      }
      return acc;
    }, {});
    console.log('Form submitted:', editedData);
    // Reset editable fields after submission
    setEditableFields({
      username: false,
      email: false,
      password: false
    });
  };

  return (
    <div className="account-settings-page">
      <header className="header-accountsettings">
        <div className="logo">Dutch Driving</div>
        <div className="header-right">
          <span>About Us</span>
          <div className="user-profile-accountsettings">
            <img src={profilepic} alt="User" className="user-avatar" />
            <span>Lisa</span>
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
                disabled={!editableFields.username}
              />
              <Pencil 
                className="edit-icon" 
                size={20} 
                onClick={() => toggleEditable('username')}
              />
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
                disabled={!editableFields.email}
              />
              <Pencil 
                className="edit-icon" 
                size={20} 
                onClick={() => toggleEditable('email')}
              />
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
                disabled={!editableFields.password}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <Pencil 
                className="edit-icon" 
                size={20} 
                onClick={() => toggleEditable('password')}
              />
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