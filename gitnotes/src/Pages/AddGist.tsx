import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import AddGistData from "../Components/AddGistData";
import { useAppSelector } from "../Store/hooks";
import { toast } from "react-toastify";
import { createGist } from "../Services/gistsServiceFunctions"; // Adjust the path based on your project structure

// Define types for form data
interface GistFormData {
  description: string;
  data: { filename: string; content: string }[];
}

// Validation schema using Yup
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
          .matches(/\.[A-Za-z]+$/, "Filename must have an extension"),
        content: Yup.string()
          .required("Content is required")
          .max(1000, "Content must be at most 1000 characters"),
      })
    )
    .min(1, "At least one file is required"),
});

const AddGist: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GistFormData>({
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

  const userToken = useAppSelector((state) => state.auth.user?.accessToken);

  const onSubmit = async (data: GistFormData) => {
    setLoading(true);

    const files = data.data.reduce(
      (acc: Record<string, { content: string }>, file) => {
        acc[file.filename] = { content: file.content };
        return acc;
      },
      {}
    );

    const gistData = {
      description: data.description,
      public: false,
      files,
    };

    try {
      await createGist(gistData, userToken);
      toast.success("Gist created successfully!");
      reset(); // Clear fields on success
    } catch (error: any) {
      toast.error(`Error creating gist: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
            sx={{ backgroundColor: "#EFEFEF", color: "#003B44" }}
            onClick={() => append({ filename: "", content: "" })}
          >
            Add File
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#003B44", color: "white" }}
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Create Gist"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddGist;
