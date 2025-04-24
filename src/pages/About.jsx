const About = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h1 className="text-4xl font-bold text-center mb-4">about us</h1>
        <p className="text-lg mb-6 text-center">Welcome to TastyDrop – your go-to destination for fresh, flavorful meals delivered right to your door. We believe good food brings people together, and we’re here to make that easy, fast, and unforgettable.</p>
        <p className="text-lg mb-6 text-center">Founded with a love for quality and convenience, we’ve built a platform that connects you with a variety of dishes made from the best ingredients. Whether you’re ordering your favorite comfort food or discovering new flavors, we’re proud to serve meals that make your day better.</p>
        <h2 className="text-2xl text-center font-semibold mt-10 mb-4">why choose us</h2>
        <ul className="list-disc list-inside text-lg space-y-2 mb-4 px-4">
          <li className="hover:text-orange-500 transition-colors duration-300">
            <span className="font-semibold">🥗 Fresh Ingredients: We partner with trusted local sources for high-quality produce and meats.</span>
          </li>
          <li className="hover:text-orange-500 transition-colors duration-300">
          <span className="font-semibold">🚀 Fast Delivery: Your food arrives hot and ready, just the way it should be.</span>
          </li>
          <li className="hover:text-orange-500 transition-colors duration-300">
          <span className="font-semibold">❤️ Customer First: We care about every order and every bite.</span>
          </li>
        </ul>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">
            We are here to make every meal an experience. Let’s eat together!
          </p>
        </div>
      </div>
    </div>
  )
}

export default About