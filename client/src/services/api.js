import axios from "axios";
// import fake_data_story1 from "./fake_data_story1.json"

export async function getNode(id) {
    //fake
    // return fake_data_story1.filter(e => +e.id === +id)[0]
    //real
    try{
            const {data} = await axios.get(`/api/nodes/${id}`)
            return data
        }catch(error){
            return {error:error}
        }
}
