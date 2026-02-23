import axios from "axios"


const commonAPI  = async (httpMethod,url,reqBody,reqHeader) => {
    const reqConfig = {
        url,
        method:httpMethod,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
    }
    return await axios(reqConfig).then(res=>res).catch(err=>err.response)
}
export default commonAPI
