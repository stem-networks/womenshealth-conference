import { NavBar } from "./components/NavBar";

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Welcome to My App</h1>
        <p className="mt-4">
          This is a Next.js application with proper data fetching patterns.
        </p>
      </div>
    </main>
  );
}
