import Header from "@/components/Header";
import LetterDensity from "@/components/LetterDensity";
import TextEditor from "@/components/TextEditor";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="w-full mx-auto max-w-5xl px-6 py-10" >
        <Header />
        <TextEditor/>
      </main>
    </div>
  );
}



