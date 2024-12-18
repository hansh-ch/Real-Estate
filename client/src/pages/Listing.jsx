import React from "react";

export default function Listing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-xl md:text-3xl font-semibold text-center  my-4 ">
        Create a listing
      </h1>
      <form action="" className="flex flex-col sm:flex-row p-3">
        <ul className="mt-2 flex flex-col gap-y-2 flex-1">
          <li className="flex flex-col gap-2 ">
            <label htmlFor="email">Name:</label>
            <input
              type="text"
              className="p-2 border rounded-lg"
              id="name"
              placeholder=""
              maxLength={70}
              required
            />
          </li>
          <li className="flex flex-col gap-2 ">
            <label htmlFor="desctiption">Decription:</label>
            <textarea
              type="text"
              className="p-2 border rounded-lg"
              id="description"
              placeholder=""
              required
            />
          </li>
          <li className="flex flex-col gap-2 ">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              className="p-2 border rounded-lg"
              id="address"
              placeholder=""
              maxLength={70}
              required
            />
          </li>

          {/* CHECKBOXES */}
          <div className="flex items-center gap-x-2 flex-wrap">
            <li className="flex gap-2 items-center">
              <input type="checkbox" className="w-5" id="sell" />
              <label htmlFor="sell">Sell</label>
            </li>
            <li className="flex gap-2 items-center">
              <input type="checkbox" className="w-5" id="rent" />
              <label htmlFor="rent">Rent</label>
            </li>
            <li className="flex gap-2 items-center">
              <input type="checkbox" className="w-5" id="parking" />
              <label htmlFor="parking">Parking</label>
            </li>
            <li className="flex gap-2 items-center">
              <input type="checkbox" className="w-5" id="furnished" />
              <label htmlFor="furnished">Furnished</label>
            </li>
          </div>

          {/* BEDS N BATHROOMS */}
          <div className="flex items-center gap-x-3 mt-2">
            <li className="flex gap-2 items-center">
              <input
                type="number"
                className="p-2 w-[50%] outline-none border-gray-300 rounded-md"
                id="bedrooms"
                min="1"
                max="10"
                defaultValue="1"
                required
              />
              <label htmlFor="bedrooms">Bedrooms</label>
            </li>
            <li className="flex gap-2 items-center">
              <input
                type="number"
                className="p-2 w-[50%] outline-none border-gray-300 rounded-md"
                id="bathrooms"
                min="1"
                max="10"
                defaultValue="1"
                required
              />
              <label htmlFor="bathrooms">Bathrooms</label>
            </li>
          </div>

          {/* PRICES */}
          <div className="flex items-center gap-x-3 mt-2 ">
            <li className="flex gap-2 items-center">
              <input
                type="number"
                className="p-2 w-[50%] outline-none border-gray-300 rounded-md"
                id="regPrice"
                required
              />
              <label htmlFor="regPrice">
                regular-Price <span className="text-gray-400">($/month)</span>
              </label>
            </li>
            <li className="flex gap-2 items-center">
              <input
                type="number"
                className="p-2 w-[50%] outline-none border-gray-300 rounded-md"
                id="disPrice"
              />
              <label htmlFor="disPrice">discount-Price</label>
            </li>
          </div>
        </ul>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col flex-1 ms-5 mt-5 md:mt-0">
          <p className="font-semibold mb-4">
            Images:
            <span className="font-normal text-gray-500 ms-2">
              First image will be the cover (max:6)
            </span>
          </p>
          <div className="flex items-center gap-x-4 gap-y-2  flex-wrap">
            <input
              type="file"
              className="p-2 rounded-md border border-gray-300"
            />
            <button className="p-3 text-green-700 border-green-700 uppercase hover:shadow-sm">
              Upload
            </button>
          </div>
          <button className="w-full p-3 bg-green-500 rounded-md outline-none mt-4 uppercase text-white">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
