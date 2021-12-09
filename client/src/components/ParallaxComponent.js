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

        {/* <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
        </ParallaxLayer> */}

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
          <section>
            <div className="container max-w-full mx-auto py-24 px-6">
              <h1 className="text-center text-4xl text-white font-medium leading-snug tracking-wider">
                Stories
              </h1>
              <p className="text-center text-white mt-2 px-6">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam.
              </p>
              <div className="h-1 mx-auto bg-indigo-200 w-24 opacity-75 mt-4 rounded mb-10"></div>

              <div className="max-w-full md:max-w-6xl mx-auto my-3 md:px-8">
                <div className="relative block flex flex-col md:flex-row items-center">
                  {/* CARD HOBBIE */}
                  <div className="w-11/12 max-w-sm sm:w-3/5 lg:w-1/3 sm:my-5 my-8 relative z-0 rounded-lg shadow-lg md:-mr-4">
                    <div className="bg-white text-black rounded-lg shadow-inner shadow-lg overflow-hidden">
                      <div className="block text-left text-sm sm:text-md text-black">
                        <img
                          className="object-cover h-48 w-screen"
                          src={Bestpickle}
                          alt="whatever"
                        />
                        <div className="m-5">
                          <div className="uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3">
                            Horror
                          </div>
                          <a
                            href="#"
                            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline mt-3"
                          >
                            Boar tries pickles
                          </a>
                          <p className="mt-2 text-gray-500 mr-2">
                            Join the boar in this new adventure visiting
                            Barcelona. What will happen? Only you can tell
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CARD MOST POPULAR */}
                  <div className="w-full max-w-md sm:w-2/3 lg:w-1/3 sm:my-5 my-8 relative z-10 bg-white rounded-lg shadow-lg">
                    <div className="text-sm leading-none rounded-t-lg bg-gray-200 text-black font-semibold uppercase py-4 text-center tracking-wide">
                      Most Popular
                    </div>
                    <div className="block text-left text-sm sm:text-md  text-black">
                      <img
                        className="object-cover h-48 w-screen"
                        src={Beetjuice}
                        alt="whatever"
                      />
                      <div className="m-5">
                        <div className="uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3">
                          Horror
                        </div>
                        <a
                          href="#"
                          className="block mt-1 text-lg leading-tight font-medium text-black hover:underline mt-3"
                        >
                          Boar tries pickles
                        </a>
                        <p className="mt-2 text-gray-500 mr-2 mb-20">
                          Join the boar in this new adventure visiting
                          Barcelona. What will happen? Only you can tell
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CARD ENTERPRISE */}
                  <div className="w-11/12 max-w-sm sm:w-3/5 lg:w-1/3 sm:my-5 my-8 relative z-0 rounded-lg shadow-lg md:-mr-4">
                    <div className="bg-white text-black rounded-lg shadow-inner shadow-lg overflow-hidden">
                      <div className="block text-left text-sm sm:text-md text-black">
                        <img
                          className="object-cover h-48 w-screen"
                          src={Citric}
                          alt="whatever"
                        />
                        <div className="m-5">
                          <div className="uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3">
                            Horror
                          </div>
                          <a
                            href="#"
                            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline mt-3"
                          >
                            Boar tries pickles
                          </a>
                          <p className="mt-2 text-gray-500 mr-2">
                            Join the boar in this new adventure visiting
                            Barcelona. What will happen? Only you can tell
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* HERE IT ENDS  */}
                </div>
              </div>
            </div>
          </section>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
