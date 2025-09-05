import axios  from "axios";

const http = axios.create({
  baseURL: 'https://news.neubri.site'
})

export default http
