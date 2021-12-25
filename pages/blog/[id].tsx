import axios from "axios"

interface dataType {
    userId : number, 
    id : number, 
    title : string, 
    body : string
}


export const getStaticPaths = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const data = await res.data;

    const paths = data.map((data : dataType) => {
        return{
            params : {id: data.id.toString()}
        }
    })

    return{
        paths,
        fallback: false
    }
}

interface IParams {
    params : {
        id : string
    }
}

export const getStaticProps =async (context : IParams) => {
    const id = context.params.id;
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const data = await res.data;

    return{
        props : {
            data : data
        }
    }
}


export default function singleBlog ({data} : any) {

    return(
        <div className="container">
            <h3 className="title">Title: {data.title.toUpperCase()}</h3>
            <h4 className="body">Description: {data.body.toUpperCase()}</h4>
            <style jsx>{
                `
                .container{
                    margin: 50px 100px
                }
                .title{
                    background: lightGray;
                    padding: 12px 30px;
                }
                .body{
                    background: #9b26b5;
                    padding: 15px 30px;
                }
                `
            }
            </style>
        </div>
    )
}