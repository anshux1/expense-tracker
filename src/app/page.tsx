import Landing from "@/components/Landing";
import { ParticlesDemo } from "@/components/landingPageBG";

export default function Home() {
  return (
    <main className="flex relative flex-col items-center justify-center min-h-screen overflow-x-hidden" >
      <Landing />
      <ParticlesDemo />
    </main >
  );
}
