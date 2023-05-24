import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { MdModeEditOutline } from "react-icons/md";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <Layout>
      <Link
        className="bg-blue-900 text-white rounded-md py-1 px-2"
        href={"/products/new"}
      >
        Add new product
      </Link>
      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Product Name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td className="flex gap-2">
                <Link
                  className="btn-default items-center"
                  href={"/products/edit/" + product._id}
                >
                  <MdModeEditOutline size="18px" />
                  Edit
                </Link>
                <Link
                  className="btn-red items-center"
                  href={"/products/delete/" + product._id}
                >
                  <FiTrash2 />
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
