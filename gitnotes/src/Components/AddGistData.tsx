import React from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AddGistData = ({
  index,
  gistData,
  setGistData,
  removeFile,
  isDeletable,
}) => {
  const handleInputChange = (e, field) => {
    const newData = [...gistData.data];
    newData[index][field] = e.target.value;
    setGistData({ ...gistData, data: newData });
  };

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Box flex={"row"} alignItems={"center"}>
        <TextField
          placeholder="Filename including extension"
          value={gistData.data[index].filename}
          onChange={(e) => handleInputChange(e, "filename")}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
            style: {
              height: "40px",
              color: "black",
              width: "250px",
              borderRadius: "4px",
              border: "1px solid white",
            },
          }}
          variant="outlined"
          sx={{ mb: 1 }}
        />
        {isDeletable && (
          <IconButton
            onClick={() => removeFile(index)}
            aria-label="delete"
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
      <TextField
        placeholder="File content"
        value={gistData.data[index].content}
        onChange={(e) => handleInputChange(e, "content")}
        multiline
        rows={4}
        variant="outlined"
        fullWidth
      />
    </Box>
  );
};

export default AddGistData;
