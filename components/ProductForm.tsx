import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
interface ProductFormProps {
  _id?: any;
  title?: any;
  description?: any;
  price?: any;
  images?: any;
  category?: any;
}
export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
}: ProductFormProps) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [imgtext, setimgtext] = useState("");
  const [goToProducts, setGoToProducts] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);
  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price, images, category };
    if (_id) {
      //update

      await axios.put("/api/products", { ...data, _id });
    } else {
      //create

      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }
  const addImage = () => {
    const newImages = [...images];
    newImages.push(imgtext);
    setimgtext("");
    setImages(newImages);
  };

  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Category</label>
      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>
      <label>Photos</label>
      <div className="mb-2">
        <div className="flex flex-wrap gap-2 py-4">
          {images?.map((image) => (
            <div className=" w-20" key={image}>
              <img src={image} alt={image} />
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Image url"
          value={imgtext}
          onChange={(ev) => setimgtext(ev.target.value)}
        />
        <button type="button" className="btn-primary" onClick={addImage}>
          Adicionar
        </button>
        {!images?.length && <div>no photos this products</div>}
      </div>
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      ></textarea>
      <label>Price (in USD)</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
