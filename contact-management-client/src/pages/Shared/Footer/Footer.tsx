

const Footer = () => {


  return (
    <div className="border-t bg-gray-800">
      <div className="container mx-auto ">
        <footer className="text-center px-3 md:px-7 md:flex lg:flex justify-between py-5 text-base-100 border-base-300">
          <div className="flex justify-center">
            <p className="flex items-center gap-2 text-2xl font-semibold">
              <img
                className="w-10"
                src="https://cdn-icons-png.freepik.com/512/5365/5365990.png"
                alt="logo"
              />{" "}
              C Management
            </p>
          </div>
          <div className="md:place-self-center pt-4 lg:pt-0 md:justify-self-end">
            &copy; Copyright | C Management
          </div>
        </footer>
      </div>
    </div>

  );
};

export default Footer;