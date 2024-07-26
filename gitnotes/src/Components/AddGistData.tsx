import React from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  styled,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, Control, FieldErrors } from "react-hook-form";

// Define styled components
const StyledBox = styled(Box)({
  marginTop: 16,
  marginBottom: 16,
});

const StyledInnerBox = styled(Box)({
  flexDirection: "row",
  alignItems: "center",
  display: "flex",
  backgroundColor: "#EFEFEF",
  padding: 8,
  border: "1px solid lightGray",
  borderBottom: "none",
  borderRadius: 4,
});

const StyledTextField = styled(TextField)({
  height: 40,
  color: "black",
  width: 250,
  borderRadius: 4,
  fontSize: 14,
});

// Define props interface with specific types
interface AddGistDataProps {
  index: number;
  control: Control<GistFormData>; // use specific form data type
  errors: FieldErrors<GistFormData>; // use specific form data type
  removeFile: (index: number) => void;
  isDeletable: boolean;
}

// Define form data interface
interface GistFormData {
  description: string;
  data?: { filename: string; content: string }[];
}

const AddGistData: React.FC<AddGistDataProps> = ({
  index,
  control,
  errors,
  removeFile,
  isDeletable,
}) => {
  return (
    <StyledBox>
      <StyledInnerBox>
        <Controller
          name={`data.${index}.filename`}
          control={control}
          render={({ field }) => (
            <StyledTextField
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
      </StyledInnerBox>
      <Controller
        name={`data.${index}.content`}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder="File content"
            sx={{ fontSize: 14 }}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            error={!!errors.data?.[index]?.content}
            helperText={errors.data?.[index]?.content?.message}
          />
        )}
      />
    </StyledBox>
  );
};

export default AddGistData;
