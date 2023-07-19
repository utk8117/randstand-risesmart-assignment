import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "./Header";
import "../styles/album.css";

const AlbumList = ({ userList, viewed, setViewed, albums, setAlbums }) => {
  const { userId } = useParams();

  useEffect(() => {
    let userAlbum = userList.filter((val) => val.userId == userId);
    if (viewed.length > 0) {
      let unseenAlbum = userAlbum.filter((unseen) => {
        viewed.map((vw) => vw.id != unseen.id);
      });
      setAlbums(userAlbum);
    } else {
      setAlbums(userAlbum);
    }
  }, []);

  return (
    <div>
      <Header renderSearch={false} />
      <div className="album-list-wrapper">
        <h2>User {userId}</h2>
        {albums.map((val) => {
          return (
            <div
              key={val.id}
              className={
                viewed.filter((v) => (v.id == val.id ? v : null)).length == 0
                  ? "album"
                  : "album-clicked"
              }
              onClick={() => {
                let view = [...viewed];
                view.push(val);
                setViewed(view);
              }}
            >
              {val.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlbumList;
