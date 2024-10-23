import React, { useState } from 'react';
import { ApolloProvider, useQuery } from '@apollo/client';
import { GET_CHARACTERS } from './queries';
import client from './apolloClient';
import './index.css';

interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

const CharactersTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { info, results } = data.characters;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Status</th>
            <th>Species</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {results.map((character: Character) => (
            <tr key={character.id}>
              <td>
                <img src={character.image} alt={character.name} width="50" />
              </td>
              <td>{character.name}</td>
              <td>{character.status}</td>
              <td>{character.species}</td>
              <td>{character.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={!info.prev}
        >
          Previous
        </button>
        <span> Page {page} of {info.pages} </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={!info.next}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <h1>Rick and Morty Characters</h1>
      <CharactersTable />
    </div>
  </ApolloProvider>
);

export default App;
