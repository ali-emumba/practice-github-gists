import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import AddGistData from "../Components/AddGistData";

// Define TypeScript types for form data
type FileData = {
  filename: string;
  content: string;
};

type FormData = {
  description: string;
  data: FileData[];
};

const validationSchema = Yup.object().shape({
  description: Yup.string()
    .required("Description is required")
    .max(200, "Description must be at most 200 characters"),
  data: Yup.array()
    .of(
      Yup.object().shape({
        filename: Yup.string()
          .required("Filename is required")
          .max(30, "Filename must be at most 30 characters")
          .matches(
            /^[^/\\?%*:|"<>\.]+$/,
            "Filename must not contain invalid characters"
          ),
        content: Yup.string()
          .required("Content is required")
          .max(1000, "Content must be at most 1000 characters"),
      })
    )
    .min(1, "At least one file is required"),
});

const AddGist = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      description: "",
      data: [{ filename: "", content: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "data",
  });

  const onSubmit = (data: FormData) => {
    console.log("Creating gist with data: ", data);
  };

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
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="This is a Git Description"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
                style: {
                  height: "40px",
                  color: "black",
                  borderRadius: "4px",
                  border: "1px solid white",
                },
              }}
              variant="outlined"
              fullWidth
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />
        {fields.map((file, index) => (
          <AddGistData
            key={file.id}
            index={index}
            control={control}
            errors={errors}
            removeFile={remove}
            isDeletable={fields.length > 1}
          />
        ))}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => append({ filename: "", content: "" })}
          >
            Add File
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit(onSubmit)}
          >
            Create Gist
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddGist;
