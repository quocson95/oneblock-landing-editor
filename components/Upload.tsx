
export const imageUpload= async (image: File) => {
    // console.log(image);
    const res = await fetch("https://api.oneblock.vn/be/mdx/name=" +image.name , {
        method: "PUT",
    })
    const data = await res.json()
    return data.url
}

export const imagePreview= (imageSource: string) => {
    // console.log(imageSource);
    return Promise.resolve('https://api.oneblock.vn/be/storage/data/?bucket=mdx&name='+imageSource);
}
