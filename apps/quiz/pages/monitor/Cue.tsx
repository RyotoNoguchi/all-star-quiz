import { Typography } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";

const TopBackGroundImg = styled.section<{url:string}>`
  /* background-image: url(${p => p.url}); */
`

const TopTitle = styled.h1`

`
const Cue = () => {
  return (

    <TopBackGroundImg url={'https://dummyimage.com/600x400/4aabcc/0011ff.jpg'}>
      <Typography variant="h1">問題です！</Typography >
    </TopBackGroundImg>
  )
  //...
}

export default Cue;