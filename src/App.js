import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import UserList from "./components/UserList";
import AlbumList from "./components/AlbumList";
import Error from "./components/Error";
const { BrowserRouter, Route, Routes } = require("react-router-dom");

const AppLayout = () => {
  const [userList, setUserList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [visitedUser, setVisitedUser] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [viewedAlbums, setViewedAlbums] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(false);
  const [randomNameMap, setRandomNameMap] = useState({});
  const randomNames = [
    "Ravi",
    "Sam",
    "Rohit",
    "Sid",
    "Sasha",
    "Lara",
    "Ram",
    "Jim",
    "Joe",
    "John",
    "Doe",
    "Lucky",
  ];

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    try {
      let data = await fetch("https://jsonplaceholder.typicode.com/albums");
      let json = await data.json();
      setUserList(json);
      let arrKey = [];
      let obj = {};
      let seenObj = {};
      let rdmName = {};
      json.forEach((val) => {
        if (!arrKey.includes(val.userId)) {
          obj[val.userId] = [val];
          arrKey.push(val.userId);
          seenObj[val.userId] = false;
          rdmName[val.userId] = randomNames[val.userId % 10] + val.userId;
        } else {
          obj[val.userId] = [...obj[val.userId], val];
        }
      });
      setVisitedUser(seenObj);
      setSortedList(obj);
      setRandomNameMap(rdmName);
    } catch (e) {
      setError(true);
    }
  };
  if (error) {
    return <Error />;
  }

  return (
    <div className="app-layout">
      <Routes>
        <Route
          path="/"
          element={
            <UserList
              sortedList={sortedList}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              setVisitedUser={setVisitedUser}
              visitedUser={visitedUser}
              viewedAlbums={viewedAlbums}
              randomNameMap={randomNameMap}
            />
          }
          errorElement={<Error />}
        ></Route>
        <Route
          path="/user/:userId"
          element={
            <AlbumList
              userList={userList}
              viewed={viewedAlbums}
              setViewed={setViewedAlbums}
              albums={albums}
              setAlbums={setAlbums}
            />
          }
          errorElement={<Error />}
        ></Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);
