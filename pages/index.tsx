import Link from "next/link";
import axios from "axios";

export const getStaticProps = async ()  => {
    const result = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const data : object[] = await result.data;

    return{
        props : {blogs : data.slice(0, 10)}
    }
}

interface blogType {
    userId : number, 
    id : number, 
    title : string, 
    body : string
}

export default function AllBlogs ({blogs} : any ) {
    console.log(blogs)
    return (
            <div className="blogContainer">
                <h1 className="heading">All Blogs</h1>
                {
                blogs.map((blog : blogType)  => (
                    <Link href={`/blog/${blog.id}`} key={blog.id }>
                        <a>
                            <h4 className="blog">{blog.title.toUpperCase()}</h4>
                        </a>
                    </Link>
                ))
                }
                <style jsx>{
                    ` 
                    .blogContainer{
                        margin: 0px 100px
                    }
                    .heading{
                        display: flex;
                        justify-content: center;
                        margin: 20px 0px;
                    }
                    .blog{
                        color: white;
                        padding: 11px 20px;
                        background: #9b26b5;
                        margin: 10px 0px;
                        border-Radius : 5px;
                    }
                    `
                }</style>
            </div>
            
    )
}