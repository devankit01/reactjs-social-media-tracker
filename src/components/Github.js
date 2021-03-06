import React from "react";
import { useState } from "react";
import Repo from "./Repo";

function Github() {
  const [search, setSearch] = useState("devankit01");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [user, setUser] = useState("");
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [repos, setRepos] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form");
    getData();
  };

  function getData() {
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/users/${search}`;

    xhr.open("GET", url, true);

    xhr.onload = function () {
      const data = JSON.parse(this.response);

      console.log(data);
      setName(data.name);
      setBio(data.bio);
      setUser(data.login);
      setFollower(data.followers);
      setFollowing(data.following);
      setAvatar(data.avatar_url);
      setLocation(data.location);
      getRepos();

    };

    xhr.send();
  }

  function getRepos() {
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/users/${search}/repos`;
    xhr.open("GET", url, true);
    xhr.onload = function () {
      const data = JSON.parse(this.response);
      console.log(data);
      setRepos(data);
      console.log(typeof data);
    };

    xhr.send();
  }

  return (
    <div>
      <div className="git__section">
        <div className="git__search">
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Enter Github User"
            ></input>
            <button type="submit">Search</button>
          </form>
        </div>
 
        <div>
          <div className="git__info">
            <div className="info__wrap">
              <div className="info__card">
                <div className="info__content__icon">
                  <i class="fas fa-atlas"></i>
                </div>
                <div className="info__content__text">
                  <h3>{repos.length}</h3>
                  <span className="text__light">Repos</span>
                </div>
              </div>

              <div className="info__card">
                <div className="info__content__icon">
                  {/* <i class="fas fa-user-friends"></i> */}
                  <i class="fa fa-users"></i>
                </div>
                <div className="info__content__text">
                  <h3>{follower}</h3>
                  <span className="text__light">Followers</span>
                </div>
              </div>

              <div className="info__card">
                <div className="info__content__icon">
                  <i class="far fa-user"></i>
                </div>
                <div className="info__content__text">
                  <h3>{following}</h3>
                  <span className="text__light">Following</span>
                </div>
              </div>

              <div className="info__card">
                <div className="info__content__icon">
                  <i class="fas fa-code"></i>
                </div>
                <div className="info__content__text">
                  <h3>0</h3>
                  <span className="text__light">Gists</span>
                </div>
              </div>
            </div>
          </div>

          <div className="git__user">
            <div className="user__info">
              <div className="user__info__details">
                <img src={avatar} alt="" style={{ float: "left" }}></img>
                <b>
                  <span style={{ float: "right" }}>{name}</span>
                </b>
                <p class="text__light" style={{ float: "right" }}>
                  @{user}
                </p>
              </div>
              <br />
              <br />
              <br />

              <div className="user__bio">
                <span>{bio}</span>

                <div className="user__extra">
                  <p>
                    <i class="far fa-building"></i>&nbsp;Coding Addict
                  </p>
                  <p>
                    <i class="fas fa-map-marker-alt"></i>&nbsp;{location}
                  </p>
                  <p>
                    <i class="fas fa-paperclip"></i>&nbsp;www.medev.in
                  </p>
                </div>
                <button className="btn">Follow</button>
              </div>
            </div>
            <div className="user__repos">
              <h4>Repositories</h4>
              <div className="repos">
                {/* <p>{repos.length}</p> */}

                <ul>
                  {Object.keys(repos).map(function (id) {
                    return (
                      <>
                        {/* <li key={name}>
                      {name}
                      {console.log(repos[name])}
                    </li> */}

                        <div className="repo__card">
                          <div className="icon">
                            <i class="fab fa-codepen"></i>
                          </div>
                          <div className="repo__info">
                            <h5>{repos[id].name}</h5>
                            <a
                              href="{repos[id].clone_url}"
                              className="text_light"
                            >
                              Clone now &rarr;
                            </a>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Github;
