import { Typography } from "@material-ui/core"
import Link from 'next/link'
import axios from "axios";
import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  const posts: Post[] = await response.data

  return {
    props: {
      posts, 
    }
  }
}

const Question = ({posts}: InferGetStaticPropsType<typeof getStaticProps>) => {
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