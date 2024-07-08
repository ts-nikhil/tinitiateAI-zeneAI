// pages/student.js
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Student() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto my-5 px-4 flex-grow pt-20">
        <h2 className="text-2xl font-bold">Welcome to the student page</h2>
        <p>This is a student area. Here you can find resources and information for students.</p>
      </main>
      <Footer />
    </div>
  );
}
