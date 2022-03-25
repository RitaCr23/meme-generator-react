import React, { useState, useEffect } from "react";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemeImages, setAllMemeImages] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemeImages(data.data.memes));
  });

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemeImages.length);
    const url = allMemeImages[randomNumber].url;
    setMeme((meme) => ({
      ...meme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((meme) => ({
      ...meme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />

        <button className="btn" onClick={getMemeImage}>
          Get a new meme image
        </button>
      </div>

      <div className="meme">
        <img src={meme.randomImage} className="meme-img" />
        <h2 className="topText">{meme.topText}</h2>
        <h2 className="bottomText">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
