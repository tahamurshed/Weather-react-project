import "../App.css";
import { useLoader } from "../contexts/LoaderContext";
export default function Loader() {
  const { openLoader } = useLoader();

  if (openLoader) {
    return (
      <span className="loader" style={{ width: "50px", height: "50px" }}></span>
    );
  }
}
