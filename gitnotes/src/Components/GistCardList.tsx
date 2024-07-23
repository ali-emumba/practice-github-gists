import React, { useState } from "react";
import { Container, styled, Paper, TablePagination } from "@mui/material";
import GistCard from "./GistCard";

const FlexContainer = styled(Container)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 16px;
`;

interface publicGistData {
  id: string;
  ownerName: string;
  ownerImageUrl: string;
  gistName: string;
  createdAt: string;
  gistDescription: string;
  rawUrl: string;
}

interface GistsTableProps {
  publicGistData: publicGistData[];
}

const GistCardList = ({ publicGistData }: GistsTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const handleChangePage = (event: unknown, newPage: number) => {
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
