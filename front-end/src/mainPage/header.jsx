import logo from "../assets/logo.jpg";

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
          }}
        >
          <span
            style={{
              fontSize: "3rem",
            }}
          >
            CLOTHING
          </span>
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
          <span
            style={{
              fontSize: "3rem",
            }}
          >
            MOVIES
          </span>
        </div>
      </header>
    </>
  );
}
