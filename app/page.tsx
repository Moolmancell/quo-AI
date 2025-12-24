import NavBar from "@/components/landing_page/Navbar";
import Background from "@/components/landing_page/Background";
import Logo from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans relative min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 flex flex-col relative">
        
        <Background />

        <div className="relative flex-1 flex w-full flex-col items-center justify-center gap-8 px-8">
          <Logo hideText={true}/>
          <div className="flex flex-col max-w-lg px-4 gap-4.5">
            <h1 className="text-3xl sm:text-5xl font-sans font-semibold text-center">
              A Calmer Feed for a Curious Mind.
            </h1>
            <p className="text-base text-center text-muted-foreground">
              Your personal AI buddy curates essays, quotes, and ideas based on what you care about — and is always ready to talk.
            </p>
          </div>
          <Button asChild size="lg"><Link href="/signup">Start Thinking <ArrowRight /></Link></Button>
        </div>
      </main>
    </div>
  );
}