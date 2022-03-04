import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCharacters } from "../../redux/characterSlice";
import Masonry from "react-masonry-css";
import "./style.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
export default function Home() {
  const character = useSelector(state => state.characters.items);

  const status = useSelector(state => state.characters.status);
  const error = useSelector(state => state.characters.error);
  const page = useSelector(state => state.characters.page);
  const hasPage = useSelector(state => state.characters.hasNextPage);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getCharacters());
    }
  }, [dispatch, status]);

  if (status === "failed") {
    return (
      <div>
        <h3 style={{ padding: 20 }}>Error: {error}</h3>
      </div>
    );
  }

  return (
    <div>
      <Masonry
        breakpointCols={5}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {character.map(character => (
          <div key={character.char_id}>
            <Link to={`character/${character.char_id}`}>
              <img src={character.img} alt={character.name} className="img" />
              <div className="names">{character.name}</div>
            </Link>
          </div>
        ))}
      </Masonry>
      <div style={{ textAlign: "center" }}>
        {status === "loading" && <p style={{ padding: "1px" }}>Loading...</p>}
        {hasPage && status !== "loading" && (
          <button
            className="button"
            onClick={() => dispatch(getCharacters(page))}
          >
            Next Page ({page})
          </button>
        )}
        {!hasPage && (
          <div>
            <h2>All characters shown.</h2>
          </div>
        )}
      </div>
    </div>
  );
}
