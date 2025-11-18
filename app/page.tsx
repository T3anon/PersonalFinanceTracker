import Image from "next/image";

export default function Home() {
  return (
    <body>
        <nav className="nav">
            <div className="nav-logo">
                <p>LOGO .</p>
            </div>
            <div className="nav-menu">
                <ul>
                    <li><a href="#" className="link">Home</a></li>
                    <li><a href="#" className="link">Blog</a></li>
                    <li><a href="#" className="link">Services</a></li>
                    <li><a href="#" className="link">About</a></li>
                </ul>
            </div>
            <div className="nav-button">
                <button className="btn" id="loginBtn">Sign In</button>
                <button className="btn" id="registerBtn">Sign Up</button>
            </div>
            <div className="menu-btn">
                
            </div>
        </nav>
    </body>
  );
}
