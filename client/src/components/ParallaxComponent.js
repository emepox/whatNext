import React, { useRef } from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import Hot from "../img/Hot.png";
import HomeTitle from "./HomeTitle";
import Firstcard from "../img/Firstcard.png";
import Secondcard from "../img/Secondcard.png";
import Thirdcard from "../img/Thirdcard.png";
import Bestpickle from "../img/Bestpickle.png";
import Citric from "../img/Citric.png";
import Beetjuice from "../img/Beetjuice.png";
import About from "./About"

const url = (name, wrap = false) =>
  `${
    wrap ? "url(" : ""
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ")" : ""
  }`;

console.log(url("clients"));

export default function ParallaxComponent() {
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
          style={{ backgroundColor: "#1C2530" }}
        />

        <ParallaxLayer
          offset={0}
          speed={0}
          factor={3}
          style={{
            backgroundSize: "cover",
          }}
        />

        <ParallaxLayer
          offset={1.3}
          speed={-0.3}
          style={{ pointerEvents: "none" }}
        >
          <img
            src={url("satellite4")}
            style={{ width: "15%", marginLeft: "70%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.5}
          speed={-0.4}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {/* <img src={url('earth')} style={{ width: '60%' }} /> */}
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            backgroundSize: "80%",
            backgroundPosition: "center",
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
          {/* <img src={url('server')} style={{ width: '20%' }} /> */}
          <HomeTitle scroll={() => parallax.current.scrollTo(1)}/>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <img src={url('bash')} style={{ width: '40%' }} className="transform hover:scale-105 transition duration-400"/> */}
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => parallax.current.scrollTo(0)}
        >
          {/* <img src={Thirdcard} style={{ width: '20%', height: '48%' }} /> */}
          {/* <Home /> */}
          <About />
          </ParallaxLayer>
      </Parallax>
    </div>
  );
}
