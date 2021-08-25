import { useState } from "react";
import styled from "styled-components";

const TopBackGroundImg = styled.section<{url:string}>`
  background-image: url(${p => p.url});
`

const TopTitle = styled.h1`

`
const Cue = () => {
  return (

    <TopBackGroundImg url={'https://dummyimage.com/600x400/4aabcc/0011ff.jpg'}>
      <TopTitle>アソビュー オールスター感謝祭2021</TopTitle>
    </TopBackGroundImg>
  )
  //...
}

export default Cue;