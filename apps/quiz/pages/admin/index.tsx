// url="/admin" ??ファイル名が"index"だと"/admin/index"でURL叩くと無限ローディングになる
import { Button, Typography} from "@material-ui/core";
const Index = () => {
  return (
    <>
      <Typography variant="h1">管理者画面です</Typography>
      <div>
        <Button color="primary" variant="contained">Cue</Button>
      </div>
    </>
  )
}

export default Index;