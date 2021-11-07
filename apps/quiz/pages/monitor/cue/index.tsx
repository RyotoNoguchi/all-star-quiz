import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Cue = ({questionNumber}) => {
  return (
    <Box component="section">
      <Typography variant="h1">問題{questionNumber}です！</Typography >
    </Box>
  )
}

export default Cue;