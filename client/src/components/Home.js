import React, { useRef } from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import HomeTitle from "./HomeTitle";
import About from "./About";
import Videodisplay from "./Videodisplay";
import Teamwork from "../img/Teamwork.png";
import Create from "../img/Create.png";

const url = (name, wrap = false) =>
  `${
    wrap ? "url(" : ""
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ")" : ""
  }`;

console.log(url("clients"));

export default function Home() {
  const parallax = useRef(null);

  return (
    <div style={{ width: "100%", height: "100%", background: "#ffff" }}>
      <Parallax ref={parallax} pages={3}>
        <ParallaxLayer
          offset={1}
          speed={1}
          factor={1}
          style={{ backgroundColor: "#DCE0EB" }}
        />
        <ParallaxLayer
          offset={2}
          speed={1}
          factor={3}
          style={{ backgroundColor: "#1C2530" }}
        />
        <ParallaxLayer
          offset={0}
          speed={0}
          factor={3}
          style={{ backgroundSize: "cover" }}
        />

        <ParallaxLayer
          offset={1.3}
          speed={-0.3}
          style={{ pointerEvents: "none" }}
        >
          <img
            // src={url("satellite4")}
            src={Create}
            style={{ width: "12%", marginLeft: "77%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={2.4} speed={-0.4} style={{display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none"}}>

          {/* <img src={url('earth')} style={{ width: '60%' }} /> */}
          <img src={Teamwork} style={{ width: "15%" }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={-0.5} style={{ backgroundSize: "80%", backgroundPosition: "center",
            // backgroundImage: url('clients', true),
          }}
        />

        <ParallaxLayer
          offset={0}
          speed={1.5}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HomeTitle scroll={() => parallax.current.scrollTo(1)} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Videodisplay />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <About />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
