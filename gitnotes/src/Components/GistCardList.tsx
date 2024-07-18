import React, { useState } from 'react';
import { Container, Pagination, styled } from "@mui/material";
import GistCard from "./GistCard"

const FlexContainer = styled(Container)`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 16px;
`;

const GistCardList = ({ publicGistData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 4;

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = publicGistData ? publicGistData.slice(indexOfFirstCard, indexOfLastCard) : [];

    const renderedCards = currentCards.map(item => (
        <GistCard
            id={item.id}
            rawUrl={item.fileName.raw_url}
            createdAt={item.createdAt}
            gistName={item.gistName}
            ownerImageUrl={item.ownerImageUrl}
            ownerName={item.ownerName}
            fileName={item.fileName}
            gistDescription={item.gistDescription}
            key={item.id}
            updatedAt={item.updatedAt}
        />
    ));

    return (
        <div>
            <FlexContainer>
                {renderedCards}
            </FlexContainer>
            {publicGistData && (
                <Pagination
                    count={Math.ceil(publicGistData.length / cardsPerPage)}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="primary"
                    sx={{ marginTop: '16px', display: 'flex', justifyContent: 'end' }}
                />
            )}
        </div>
    );
}

export default GistCardList;
