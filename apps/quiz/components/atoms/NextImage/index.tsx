import styled from "styled-components"
import Image from 'next/image'

const StyledImage = styled(Image)`
`

interface Props {
  url: string
  alt: string
}

const NextImage: React.FC<Props> = ({
  url,
  alt
}) => {
  return (
    <>
      <StyledImage src={url} alt={alt} />
    </>
  )
}
export default NextImage