/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();

  const [image, setImage] = useState("");
  useEffect(() => {
    if (session?.user?.image) {
      const img = session.user.image.split("=");
      setImage(img[0]);
    }
  }, [session?.user?.image]);
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between w-full">
        <h2>
          Hello,<b> {session?.user?.name}</b>
        </h2>

        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden items-center  h-min ">
          {image !== "" ? (
            <img className={"w-10 h-10"} src={image} alt="" />
          ) : null}
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
