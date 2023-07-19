import React from "react";
import "../styles/header.css";

const Header = ({ renderSearch, value, setValue }) => {
  return (
    <div className="header">
      <div className="logo">Logo</div>
      <div className="search">
        {renderSearch && (
          <input
          placeholder="Search"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
