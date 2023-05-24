/* eslint-disable react/no-unescaped-entities */
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState<any>();
  const { id } = router.query;
  useEffect(() => {
    const alterar = async () => {
      const response = await axios.get("/api/products?id=" + id);
      setProductInfo(response.data);
    };
    if (!id) {
      router.back();
    } else {
      alterar();
    }
  }, [id, router]);
  const deleteProduct = () => {
    try {
      axios.delete("/api/products?id=" + id);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete this product &nbsp;" {productInfo?.title}{" "}
        "?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button className="btn-default" onClick={() => router.back()}>
          No
        </button>
      </div>
    </Layout>
  );
}
