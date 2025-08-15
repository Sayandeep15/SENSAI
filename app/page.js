import Image from "next/image";
import Header from "@/components/header";
import HeroSection from "@/components/hero";
import LightRays from "@/components/ui/LightRays ";


export default function Home() {
  return (
    <>

<div style={{ width: '100%', height: '600px', position: 'absolute' }}>
  <LightRays
    raysOrigin="top-center"
    raysColor="#00ffff"
    raysSpeed={1.5}
    lightSpread={0.8}
    rayLength={1.2}
    followMouse={true}
    mouseInfluence={0.1}
    noiseAmount={0.1}
    distortion={0.05}
    className="custom-rays"
  />
</div>
    <div className="grid-background"></div>
    <Header/>

    <HeroSection />
    
    </>
      
    
  );
}
