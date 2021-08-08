import styles from "../styles/components/HomeMainCard.module.scss";
import { useContext, useState, useEffect } from "react";
import { PlayCircleFilled } from "@material-ui/icons";
import { SongBarContext } from '../contexts/songBar';
import { Suggestion } from "../contexts/user";

interface HomeMainCardProps {
  suggestion: Suggestion;
}

export default function HomeSectionCard({ suggestion }: HomeMainCardProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageURL, setImageURL] = useState("");

  const {
    playUri: playURI
  } = useContext(SongBarContext);

  useEffect(() => {
    switch(suggestion.type){
      case "album":
        setTitle(suggestion.item.album.name);
        setSubtitle(suggestion.item.album.artists[0].name);
        setImageURL(suggestion.item.album.images[0].url);
        break;
      case "track":
        setTitle(suggestion.item.track.name);
        setSubtitle(suggestion.item.track.artists[0].name);
        setImageURL(suggestion.item.track.album.images[0].url);
        break;
      case "playlist":
        setTitle(suggestion.item.name);
        setSubtitle("Playlist");
        setImageURL(suggestion.item.images[0].url);
        break;
    }
  }, []);

  function handlePlay() {
    //playURI(uri, contextUri);
  }

  return (
    <div
      className={styles.HomeMainCardContainer}
      style={{ backgroundImage: `url(${imageURL})` }}
    >
      <div className={styles.cardInfos}>
        <div>
          <h1>{title}</h1>
          {subtitle ? <h3>{subtitle}</h3> : <></>}
        </div>
        <div className="button" onClick={handlePlay}>
          <span>PLAY</span>
          <PlayCircleFilled />
        </div>
      </div>
    </div>
  )
}