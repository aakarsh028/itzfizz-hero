import Hero from "./components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="grid min-h-[70vh] place-items-center px-6 text-center">
        <p className="display max-w-2xl text-2xl font-medium leading-snug sm:text-4xl">
          Fast sites, built by people who sweat the details.
        </p>
      </section>
    </main>
  );
}