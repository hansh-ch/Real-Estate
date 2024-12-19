import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage, storageID } from "../utils/appwrite";
import { ID } from "appwrite";
import { toast } from "react-toastify";
import { CREATELIST_URL } from "../utils/constants";
const initalData = {
  name: "",
  description: "",
  address: "",
  type: "",
  parking: false,
  furnished: false,
  bedrooms: 0,
  bathrooms: 0,
  regularPrice: 0,
  discountPrice: 0,
};
export default function Listing() {
  const [file, setFile] = useState(null);
  const [imgIDs, setImgIDs] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState(initalData);

  const navigate = useNavigate();
  async function handleImageUpload(e) {
    e.preventDefault();

    //Checking if file exists
    if (!file) {
      toast.error("Please select a file");
    } else if (file?.length > 7) {
      toast.error("Max 6 files allowed");
    }

    // const res = storage.getFileView(storageID, "6763bb60001d89902dc6");
    // Uploading image
    if (file?.length > 0 && file?.length < 7) {
      for (let i = 0; i < file.length; i++) {
        setIsUploading(true);
        storage
          .createFile(storageID, ID.unique(), file[i])
          .then(async (data) => {
            setImgIDs((prev) => [...prev, data.$id]);
            // console.log(data);
            setIsUploading(false);
            setError(false);
            const url = await storage.getFileView(storageID, data.$id);
            setImgUrl((prev) => [...prev, url]);
          })
          .catch((err) => {
            setIsUploading(false);
            setError(true);
            toast.error("Upload failed ! server error");
            console.log(err);
            return;
          });
      }
    }
  }
  function deleteImage(i) {
    const ids = imgIDs.filter((_i, ind) => ind != i);
    const res = imgUrl.filter((url, ind) => ind !== i);
    setImgUrl(res);
    setImgIDs(ids);
  }
  function handleChange(e) {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }

    if (e.target.id === "parking" || e.target.id === "furnished") {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  }

  //==> Handling Submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (imgUrl.length < 1) {
      toast.error("List must have an image");
      return;
    } else if (formData.discountPrice >= formData.regularPrice) {
      toast.error("Discount price should be less than regular price");
      return;
    } else {
      const data = { ...formData, imgUrls: imgUrl };
      const res = await fetch(CREATELIST_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await res.json();
      if (result.status === "success") {
        navigate("/lists");
        toast.success("List created succesfully");
      }
    }
  }

  return (
    <main className="p-3 max-w-4xl mx-auto min-h-[90vh]">
      <h1 className="text-xl md:text-3xl font-semibold text-center  my-4 ">
        Create a listing
      </h1>
      {/* FORM SECTION */}
      <section className="flex flex-col sm:flex-row p-3">
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
              value={formData.name}
              onChange={handleChange}
              // onChange={(e) => setName(e.target.value)}
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
              value={formData.description}
              onChange={handleChange}
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
              value={formData.address}
              onChange={handleChange}
            />
          </li>

          {/* CHECKBOXES */}
          <div className="flex items-center gap-x-2 flex-wrap">
            <li className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-5"
                id="sale"
                onChange={handleChange}
                // checked={formData.type === "sale"}
              />
              <label htmlFor="sale">Sell</label>
            </li>
            <li className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-5"
                id="rent"
                onChange={handleChange}
                // checked={formData.type === "rent"}
              />
              <label htmlFor="rent">Rent</label>
            </li>
            <li className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-5"
                id="parking"
                value={formData.parking}
                onChange={handleChange}
              />
              <label htmlFor="parking">Parking</label>
            </li>
            <li className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-5"
                id="furnished"
                value={formData.furnished}
                onChange={handleChange}
              />
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
                required
                onChange={handleChange}
                value={formData.bedrooms}
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
                required
                onChange={handleChange}
                value={formData.bathrooms}
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
                id="regularPrice"
                required
                onChange={handleChange}
                value={formData.regularPrice}
                min="100"
              />
              <label htmlFor="regularPrice">
                regular-Price <span className="text-gray-400">($/month)</span>
              </label>
            </li>
            <li className="flex gap-2 items-center">
              <input
                type="number"
                className="p-2 w-[50%] outline-none border-gray-300 rounded-md"
                id="discountPrice"
                onChange={handleChange}
                value={formData.discountPrice}
              />
              <label htmlFor="discountPrice">discount-Price</label>
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
            <form>
              <input
                type="file"
                className="p-2 rounded-md border border-gray-300"
                accept="image/*"
                name="image"
                multiple
                onChange={(e) => setFile(e.target.files)}
              />
              <button
                className="p-3 text-green-700 border-green-700 uppercase hover:shadow-sm"
                // type="submit"
                disabled={isUploading}
                onClick={handleImageUpload}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </form>
          </div>

          {/* Image Container */}
          {imgUrl && (
            <div className="overflow-y-scroll overflow-x-hidden h-[50%] mx-auto">
              <div className="p-3 flex flex-col gap-y-4 justify-center  mx-auto">
                {imgUrl?.map((url, i) => (
                  <div key={i} className="flex items-center gap-x-3">
                    <div className="p-2">
                      <img
                        src={url}
                        alt="url"
                        className=" rounded-md mx-auto "
                      />
                    </div>
                    <button
                      className="text-red-700"
                      onClick={() => deleteImage(i)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
            className="w-full p-3 bg-green-500 rounded-md outline-none mt-4 uppercase text-white"
            // type="submit"
            onClick={handleSubmit}
          >
            Create Listing
          </button>
        </div>
      </section>
    </main>
  );
}
