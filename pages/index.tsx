import Link from "next/link";
import axios from "axios";
import { GetStaticProps } from "next";

export const getStaticProps : GetStaticProps = async ()  => {
    const result = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const data : blogType[] = await result.data;

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

interface AllBlogsProps {
    blogs: blogType[]
}

 const AllBlogs = ({blogs}: AllBlogsProps) => {

    console.log(blogs)
    return (
            <div className="blogContainer">
                <h1 className="heading">All Blogs</h1>
                {
                blogs.map((blog : blogType)  => (
                    <Link href={`/blog/${blog.id}`} key={blog.id }>
                        <a>
                            <h4 className="blog">{blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}</h4>
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
                        background: lightgray;
                        margin: 20px 0px;
                        border-Radius : 5px;
                        padding: 10px 20px;
                        box-Shadow: 2px 2px 2px #9b26b0;
                    }
                    .blog{
                        color: white;
                        padding: 10px;
                        background: #9b26b5;
                        margin: 10px 0px;
                        border-Radius : 5px;
                    }
                    `
                }</style>
            </div>
            
    )
}

export default AllBlogs;

