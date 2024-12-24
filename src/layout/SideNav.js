import React, { useState } from 'react';
import "../App.css";
const SideNav = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <div className="side-nav-bar">
      <ul>
        <li><a href="/">Users</a></li>
        <li><a href="/Inventory">Inventory</a></li>
        <li><a href="/Item">Items</a></li>
        <li><a href="/Order">Orders</a></li>
        <li><a href="/Location">Location</a></li>
        <li><a href="/Supplier">Suppliers</a></li>
      </ul>
    </div>
  );
};

export default SideNav;
