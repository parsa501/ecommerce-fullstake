const fetchData=async(url,option={})=>{
    try {
        const res=await fetch(import.meta.env.VITE_BASE_API+url,option)
        const data=await res.json()
        return data
    } catch (error) {
        return {success:false,message:error.message}
    }
}
export default fetchData