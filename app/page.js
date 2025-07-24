import GridGuides from "./components/GridGuides.js";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to My App</h1>

      <p className="text-lg mt-4">
        This is a sample application using Next.js.
      </p>
      <GridGuides />
    </main>
  );
}

