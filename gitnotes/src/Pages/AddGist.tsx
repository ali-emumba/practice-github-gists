import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import AddGistData from "../Components/AddGistData";

const AddGist = () => {
  const [gistData, setGistData] = useState({
    description: "",
    data: [
      {
        filename: "",
        content: "",
      },
    ],
  });

  const addFile = () => {
    setGistData({
      ...gistData,
      data: [...gistData.data, { filename: "", content: "" }],
    });
  };

  const removeFile = (index) => {
    if (gistData.data.length > 1) {
      const newData = gistData.data.filter((_, i) => i !== index);
      setGistData({ ...gistData, data: newData });
    }
  };

  const createGist = () => {
    // Add your logic to handle the gist creation
    console.log("Creating gist with data: ", gistData);
  };

  console.log(gistData);

  return (
    <Box
      sx={{
        minHeight: "93vh",
        width: "100%",
        padding: "5vh 5vw",
      }}
    >
      <Typography variant="h5">Create Gist</Typography>
      <Box
        sx={{
          mt: "2rem",
          px: { xs: 0, sm: "2vw", md: "8vw", lg: "16vw" },
        }}
      >
        <TextField
          id="input-with-icon-textfield"
          placeholder="This is a Git Description"
          value={gistData.description}
          onChange={(e) =>
            setGistData({ ...gistData, description: e.target.value })
          }
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
            style: {
              height: "40px",
              color: "black",
              borderRadius: "4px",
              border: "1px solid white",
            },
          }}
          variant="outlined"
          fullWidth
        />
        {gistData.data.map((file, index) => (
          <AddGistData
            key={index}
            index={index}
            gistData={gistData}
            setGistData={setGistData}
            removeFile={removeFile}
            isDeletable={gistData.data.length > 1}
          />
        ))}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="contained" color="primary" onClick={addFile}>
            Add File
          </Button>
          <Button variant="contained" color="secondary" onClick={createGist}>
            Create Gist
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddGist;
