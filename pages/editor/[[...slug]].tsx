'use client'

import Button from "@/components/Button";
import Loading from "@/components/loading";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from 'next/router'
import {  useEffect, useState } from "react";

const EditorComp = dynamic(() => import("../../components/Editor"), { ssr: false });

const Editor =  () =>{
    const [mdxContent, setMdxContent] = useState(' ');
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    let didInit = false;
    const router = useRouter()
   
    let id = router.query.slug || [];
    
    async function fetchPosts() {      
      if (id.length == 0 || parseInt(id[0]) <= 0) {
        setMdxContent(' ');
        setLoading(false);
        return;
      }
    {
      console.log('load mdx', id[0]);
      const res = await fetch('https://api.oneblock.vn/be/mdx/' +id[0]+'?loadContent=1')
      const bodyJson = await res.json();      
      // console.log(bodyJson);
      setMdxContent(bodyJson.content);
      setName( bodyJson.name);
    }
    {
      const res = await fetch('')
    }
      setLoading(false);
    };

    const saveMdx = async (id: number) => {
      // console.log('save', mdxContent)
      const res = await fetch('https://api.oneblock.vn/be/mdx/?name='+name + "&id="+id, {method: "put", body: mdxContent,} )
      console.log(res);
    }

    const copyContentMdx = (mdx: string) => {
      // console.log(mdx)
      setMdxContent(mdx);
    }

    useEffect(() => {
      if (didInit) {
        return;
      }
      didInit  = true;
      fetchPosts();
    }, [])
    if (loading) {
      return <Loading></Loading>
    }
    
    return(
      <>
        <Button><Link href="/">Home</Link></Button>
        <Button  onClick={()=>{          saveMdx(parseInt(id[0]));        }} >Save</Button>

        <form>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Name</label>
              <input onChange={(e)=>{ setName(e.target.value)}}              
              value={name}
                type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          </div>
        </form>        
       
        
        <EditorComp content={mdxContent} onContentChange={copyContentMdx}/>        
      </>
    )
}

export default  Editor;

// export default function Page() {
//   const router = useRouter()
//   return <p>Post: {router.query.slug}</p>
// }