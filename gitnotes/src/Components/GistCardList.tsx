import { useState } from "react";
import { Box, styled, TablePagination } from "@mui/material";
import GistCard from "./GistCard";

const FlexContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 0;
`;

interface publicGistData {
  id: string;
  ownerName: string;
  ownerImageUrl: string;
  gistName: string;
  createdAt: string;
  gistDescription: string;
  fileName: {
    raw_url: string;
  };
}

interface GistsTableProps {
  publicGistData: publicGistData[];
}

const GistCardList = ({ publicGistData }: GistsTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(6);

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(event);
    setPage(newPage);
  };

  const indexOfLastCard = page * rowsPerPage + rowsPerPage;
  const indexOfFirstCard = page * rowsPerPage;
  const currentCards = publicGistData
    ? publicGistData.slice(indexOfFirstCard, indexOfLastCard)
    : [];

  const renderedCards = currentCards.map((item) => (
    <GistCard
      fullWidth={false}
      id={item.id}
      rawUrl={item.fileName.raw_url}
      createdAt={item.createdAt}
      gistName={item.gistName}
      ownerImageUrl={item.ownerImageUrl}
      ownerName={item.ownerName}
      gistDescription={item.gistDescription}
      key={item.id}
    />
  ));

  return (
    <>
      <FlexContainer>{renderedCards}</FlexContainer>
      {publicGistData && (
        <TablePagination
          component="span"
          count={publicGistData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      )}
    </>
  );
};

export default GistCardList;
