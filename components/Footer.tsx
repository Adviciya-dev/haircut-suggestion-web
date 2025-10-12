// import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black/80 border-t border-gray-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
        <p>&copy; 2025 Futuris AI. All rights reserved.</p>
        {/* <div className="mt-4 space-x-4">
          <Link href="/privacy" className="hover:text-blue-400">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-blue-400">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-blue-400">
            Contact
          </Link>
        </div> */}
      </div>
    </footer>
  );
}
