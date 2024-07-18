import { Box, Container, Typography } from "@mui/material"
import GistsTable from "../Components/GistsTable"
import { usePublicGistsData } from "../Services/hooks/usePublicGistData"

const HomePage = () => {

    const data = usePublicGistsData(false)
    console.log(data)
  return (
    <Container sx={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem'}}>
            <Typography variant="h5">
                Public Gists
            </Typography>

            {/* add the switch here */}
            <Typography>
                Public Gists
            </Typography>
        </Box>
        <GistsTable />
    </Container>
  )
}

export default HomePage
