import { Typography } from "@material-ui/core"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from 'axios'


type Post = {
  userId:number
  id:number
  title:string
  body:string
}

export const getStaticPaths = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  const data = response.data

  const paths = data.map((post:Post) => {
    return {
      params: {id: post.id.toString() }
    }
  })

  return {
    paths: paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const data = await response.json()
  console.log("データ");
  return {
    props: {post: data}
  }
}


const Question = ({post}) => {
  // const router = useRouter() 
  // const {questionId} = router.query; 
  // const [question, setQuestion] = useState<Question>()
  // useEffect(() => {
  //   const fetchQuestion = async() => {
  //     const question = await axios.get(`https://jsonplaceholder.typicode.com/posts/${questionId}`)
  //     setQuestion(question.data)
  //   }
  //   fetchQuestion()
  // }, [questionId])

  return (
    <>
    <Typography variant="h1">出題画面です</Typography>
    <Typography variant="h2">問題番号: {post.id}</Typography>
    <Typography variant="h2">タイトル:{post.title}</Typography>
    </>
  )
}

export default Question