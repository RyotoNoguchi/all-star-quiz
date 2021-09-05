import { Typography } from "@material-ui/core"
import Link from 'next/link'
import axios from "axios";
export const getStaticProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  // const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  // console.log(response);
  
  const data = await response.json()
  console.log(data);

  return {
    props: {
      posts: data 
    }
  }
}

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

const Question = ({posts}) => {
  return (
    <>
    <Typography variant="h4">出題画面</Typography>
    {posts.map((post: Post) => (
      <Link href={`/monitor/question/${post.id}` } passHref key={post.id}>
        <Typography variant="body2">{post.title}</Typography>
      </Link>
    ))}
    </>
  )
}

export default Question