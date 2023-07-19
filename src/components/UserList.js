import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "../styles/user.css";

const UserList = (props) => {
  const {
    sortedList,
    searchValue,
    setSearchValue,
    visitedUser,
    setVisitedUser,
    viewedAlbums,
    randomNameMap,
  } = props;
  const findCount = (arr, total) => {
    let count = arr.filter((a) => {
      let vwalb = viewedAlbums.filter((v) => {
        if (a.id == v.id) {
          return a;
        }
      });
      if (vwalb.length > 0) {
        return vwalb[0];
      }
    });
    if (count != undefined) {
      let rem = total - count.length;
      return rem;
    }
    return total;
  };
  const onSearch = (e) => {
    setSearchValue(e);
    Object.values(randomNameMap).includes(e);
  };

  return (
    <>
      <Header renderSearch={true} value={searchValue} setValue={onSearch} />
      <div className="user-list-container">
        {Object.keys(sortedList).map((val) => {
          if (
            searchValue == "" ||
            randomNameMap[val].toLowerCase().includes(searchValue.toLowerCase())
          ) {
            return (
              <Link key={val} to={`/user/${val}`} className="user-card-link">
                <div
                  className={
                    visitedUser[val] ? "viewed-user-wrapper" : "user-wrapper"
                  }
                  onClick={() => {
                    let seen = visitedUser;
                    seen[val] = true;
                    setVisitedUser(seen);
                  }}
                  id={val}
                >
                  <div className="user">
                    <div className="user-card">
                      <h4>{randomNameMap[val]}</h4>
                    </div>
                  </div>
                  <span className="user-album-count">
                    {!visitedUser[val]
                      ? sortedList[val].length
                      : findCount(sortedList[val], sortedList[val].length)}
                  </span>
                </div>
              </Link>
            );
          }
          if (
            searchValue != 0 &&
            !randomNameMap[val]
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          ) {
            return <div key={val}></div>;
          }
          if (
            searchValue != 0 &&
            randomNameMap[val].toLowerCase().includes(searchValue.toLowerCase())
          ) {
            return (
              <Link key={val} to={`/user/${val}`} className="user-card-link">
                <div
                  className={
                    visitedUser[val] ? "viewed-user-wrapper" : "user-wrapper"
                  }
                  onClick={() => {
                    let seen = visitedUser;
                    seen[val] = true;
                    setVisitedUser(seen);
                  }}
                  id={val}
                >
                  <div className="user">
                    <div className="user-card">
                      <h4>{randomNameMap[val]}</h4>
                    </div>
                  </div>
                  <span className="user-album-count">
                    {!visitedUser[val]
                      ? sortedList[val].length
                      : findCount(sortedList[val], sortedList[val].length)}
                  </span>
                </div>
              </Link>
            );
          }
        })}
      </div>
    </>
  );
};

export default UserList;
