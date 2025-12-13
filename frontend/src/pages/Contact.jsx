import React from "react";

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-gray-300 mb-6">
          We're here to help. Reach out to us via phone, email or visit our
          office.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
            <p className="text-gray-300">+919534214839</p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-2">
              Email
            </h3>
            <p className="text-gray-300">harshkr.agrl@gmail.com</p>
            <p className="text-gray-300">Ayush@gmail.com</p>
            <p className="text-gray-300">Nitin@gmail.com</p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-2">
              Address
            </h3>
            <p className="text-gray-300">
              LPU, Grand Truck Road
              <br />
              Phagwara, Punjab 144411
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Business Hours
            </h3>
            <p className="text-gray-300">
              Mon - Fri: 9:00 AM - 6:00 PM
              <br />
              Sat: 10:00 AM - 4:00 PM
              <br />
              Sun: Closed
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-2">
              Other Info
            </h3>
            <p className="text-gray-300">
              For bulk orders, partnerships or press inquiries, please email
              partnerships@kharidari.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
