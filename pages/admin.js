// pages/admin.js
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Admin() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto my-5 px-4 flex-grow pt-20">
        <h2 className="text-2xl font-bold">Welcome to the admin page</h2>
        <p>This is a secure admin area. Only authorized personnel should have access.</p>
      </main>
      <Footer />
    </div>
  );
}
