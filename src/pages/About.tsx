import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';

export function About() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          About Gourmet Haven
        </h1>

        <div className="prose prose-lg mx-auto">
          <p className="text-gray-600 mb-8 text-center">
            Welcome to Gourmet Haven, where culinary excellence meets warm hospitality.
            Our passionate team of chefs creates memorable dining experiences using the
            finest seasonal ingredients.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto text-orange-500 mb-2" />
              <h3 className="font-semibold mb-2">Hours</h3>
              <p className="text-gray-600">
                Mon-Fri: 11am - 10pm<br />
                Sat-Sun: 10am - 11pm
              </p>
            </div>

            <div className="text-center">
              <MapPin className="h-8 w-8 mx-auto text-orange-500 mb-2" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-gray-600">
                123 Gourmet Street<br />
                Foodie City, FC 12345
              </p>
            </div>

            <div className="text-center">
              <Phone className="h-8 w-8 mx-auto text-orange-500 mb-2" />
              <h3 className="font-semibold mb-2">Contact</h3>
              <p className="text-gray-600">
                (555) 123-4567<br />
                info@gourmethaven.com
              </p>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=2000"
            alt="Restaurant interior"
            className="w-full h-[400px] object-cover rounded-lg mb-8"
          />

          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Private Events</h2>
            <p className="text-gray-600 mb-4">
              Host your special occasions at Gourmet Haven. Our private dining room
              accommodates up to 40 guests, perfect for corporate events, celebrations,
              or intimate gatherings.
            </p>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors">
              Inquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}