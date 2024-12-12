'use client'

import Button from "@/components/Button";
import Loading from "@/components/loading";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from 'next/router'
import {  useEffect, useState } from "react";
const EditorComp = dynamic(() => import("../../components/Editor"), { ssr: false });

const Editor =  () =>{
    const [data, setData] = useState(' ');
    let didInit = false;
    const router = useRouter()
    let id = router.query.slug || [];
    async function fetchPosts() {
      if (id.length == 0 || parseInt(id[0]) <= 0) {
        setData(' ');
        return;
      }
      const res = await fetch('https://api.oneblock.vn/be/mdx/' +id[0])
      const data = await res.text();
      // console.log(data);
      setData(data)
    };

    useEffect(() => {
      if (didInit) {
        return;
      }
      didInit  = true;
      fetchPosts();
    }, [])
    if (!data) {
      return <Loading></Loading>
    }
    return(
      <>
        <Button><Link href="/">Home</Link></Button>
        <EditorComp content={data}/>        
      </>
    )
}

export default  Editor;

// export default function Page() {
//   const router = useRouter()
//   return <p>Post: {router.query.slug}</p>
// }