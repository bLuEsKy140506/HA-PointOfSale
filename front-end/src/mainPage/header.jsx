import logo from "../assets/logo.jpg";
import "./header.css";

export default function HeaderLogo() {
  return (
    <>
      <header>
        <div
          className="flex-row"
          style={{
            backgroundColor: "#BA3B0A",
            width: "100",
            height: "15vh",
            justifyContent: "center",
            alignItems: "center",
            color: "wheat",
            position: "relative",
          }}
        >
          <div className="side-of-logo">
            <span className="span-header span-header-left">CLOTHING</span>
          </div>

          <a href="http://127.0.0.2:3420/myname">
            <img
              src={logo}
              style={{
                display: "block",
                height: "15vh",
                margin: "0 auto",
              }}
              alt="logo-of-the-imaginary-company"
            ></img>
          </a>
          <div className="side-of-logo">
            <span className="span-header span-header-right">MOVIES</span>
          </div>
        </div>
      </header>
    </>
  );
}
