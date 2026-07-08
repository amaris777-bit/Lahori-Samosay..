import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🥟</span>
              <div>
                <h3 className="font-serif text-xl font-bold">Lahori Samosay</h3>
                <p className="text-[10px] tracking-[0.2em] uppercase text-saffron-400">
                  Authentic Flavors
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bringing the authentic taste of Lahore to your doorstep. 
              Handcrafted with love, served with passion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-saffron-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Full Menu", href: "/products" },
                { label: "About Us", href: "/" },
                { label: "Contact", href: "/" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-saffron-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-saffron-400 mb-4">
              Opening Hours
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li className="flex justify-between">
                <span>Mon - Thu</span>
                <span>11AM - 10PM</span>
              </li>
              <li className="flex justify-between">
                <span>Fri - Sat</span>
                <span>11AM - 11PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>12PM - 9PM</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-saffron-400 mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>42 Food Street, Anarkali Bazaar, Lahore</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>hello@lahorisamosay.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © 2025 Lahori Samosay. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">
              Made with ❤️ and lots of spice
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
