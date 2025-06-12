// src/components/Layout.tsx
import React from 'react';
import './Layout.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        {children}
      </div>
    </div>
  );
};

export default Layout;
