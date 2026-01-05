import oceanimg from "../../assets/ocean1.jpeg";
import "./AboutHero.css";

export default function AboutHero() {
  return (
    <div className="about-hero">
      <img src={oceanimg} alt="ocean" />
    
      <div className="hero-content">
        <h1>About Tourm</h1>
        <p>Home → About Tourm</p>
      </div>
    </div>

  );
}

