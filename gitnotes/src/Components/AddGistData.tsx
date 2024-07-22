import React from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, Control, FieldErrors } from "react-hook-form";

// Define TypeScript types for component props
interface AddGistDataProps {
  index: number;
  control: Control<any>;
  errors: FieldErrors<any>;
  removeFile: (index: number) => void;
  isDeletable: boolean;
}

const AddGistData: React.FC<AddGistDataProps> = ({
  index,
  control,
  errors,
  removeFile,
  isDeletable,
}) => {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Box
        flex={"row"}
        alignItems={"center"}
        display="flex"
        sx={{
          backgroundColor: "#EFEFEF",
          p: 1,
          border: "1px solid lightGray ",
          borderBottom: "none",
          borderRadius: "4px",
        }}
      >
        <Controller
          name={`data.${index}.filename`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Filename including extension"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
                style: {
                  height: "40px",
                  color: "black",
                  width: "250px",
                  borderRadius: "4px",
                  fontSize: "14px",
                },
              }}
              variant="outlined"
              error={!!errors.data?.[index]?.filename}
              helperText={errors.data?.[index]?.filename?.message}
            />
          )}
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
      <Controller
        name={`data.${index}.content`}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="File content"
            sx={{ fontSize: "14px" }}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            error={!!errors.data?.[index]?.content}
            helperText={errors.data?.[index]?.content?.message}
          />
        )}
      />
    </Box>
  );
};

export default AddGistData;
