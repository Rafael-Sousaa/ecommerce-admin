import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewProducts() {
  return (
    <Layout>
      <ProductForm />
    </Layout>
  );
}
