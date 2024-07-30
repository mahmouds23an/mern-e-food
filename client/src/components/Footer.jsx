const Footer = () => {
  return (
    <div>
      <footer className="footer xl:px-24 py-10 px-4 text-base-content justify-between">
        <nav>
          <header className="footer-title">Useful links</header>
          <a className="link no-underline text-gray-400 hover:text-teal-500">
            About us
          </a>
          <a className="link no-underline text-gray-400 hover:text-teal-500">
            Events
          </a>
          <a className="link no-underline text-gray-400 hover:text-teal-500">
            Blogs
          </a>
          <a className="link no-underline text-gray-400 hover:text-teal-500">
            FAQ
          </a>
        </nav>
        <nav>
          <header className="footer-title">Main Menu</header>
          <a className="link no-underline text-gray-400 hover:text-teal-500">
            Home
          </a>
          <a className="link no-underline text-gray-400 hover:text-teal-500">
            Offers
          </a>
          <a className="link no-underline text-gray-400 hover:text-teal-500">
            Menus
          </a>
          <a className="link no-underline text-gray-400 hover:text-teal-500">
            Reservation
          </a>
        </nav>
        <nav>
          <header className="footer-title">Contact Us</header>
          <a className="link no-underline text-gray-400 hover:text-teal-500">
            example@email.com
          </a>
          <a className="link no-underline text-gray-400 hover:text-teal-500">
            +64 958 248 966
          </a>
          <a className="link no-underline text-gray-400 hover:text-teal-500">
            Social media
          </a>
        </nav>
      </footer>
      <hr />
      <footer className="footer items-center xl:px-24 px-4 py-4 mt-2">
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <aside>
            <img src="/logo.png" alt="" />
          </aside>
        </nav>
        <aside className="items-center grid-flow-col">
          <p className="text-gray-400">Copyright © 2024 - All right reserved</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
