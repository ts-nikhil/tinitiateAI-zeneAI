// pages/about.js
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto my-5 px-4 flex-grow pt-20">
        <h2 className="text-2xl font-bold">About Us</h2>
        <p>This is the about us page.</p>
      </main>
      <Footer />
    </div>
  );
}
