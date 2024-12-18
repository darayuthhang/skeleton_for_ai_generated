import React from 'react';

const FutureTrends = () => {
  return (
    <section className="bg-gray-50 py-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Future of 3D Branding</h2>
        <blockquote className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <p className="text-lg italic text-gray-700">
            "The future of 3D branding is full of innovation, with advancements in 3D printing, holographic displays, and AI leading to dynamic, adaptable logos. These logos will not only enhance brand perception but also offer personalized, engaging experiences. Their unique, three-dimensional design makes them ideal for both digital and print media."
          </p>
          <footer className="mt-4">
            <a
              href="https://www.smashbrand.com/articles/3d-logos-on-branding/#:~:text=3D%20logos%20can%20improve%20a,a%20dynamic%20and%20modern%20way"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Source: SmashBrand
            </a>
          </footer>
        </blockquote>
      </div>
    </section>
  );
};

export default FutureTrends;
