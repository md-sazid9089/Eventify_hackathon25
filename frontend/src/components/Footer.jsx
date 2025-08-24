// Site footer
export default function Footer() {
  return (
    <footer className="bg-white-900 text-black-400 py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <p>&copy; {new Date().getFullYear()} Invitex by Designesia</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-pink">Facebook</a>
          <a href="#" className="hover:text-pink">Twitter</a>
          <a href="#" className="hover:text-pink">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
