import React, {useEffect, useState} from "react";
import axios from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    axios.get('/repositories').then(response => {
      setRepositories(response.data);
    });

  },[]);

  async function handleAddRepository() {
    const response = await axios.post('/repositories', {
      title: `Lib C++ ${Date.now()}`,
      url: 'github.com/samplelib',
      techs: ['C++', 'C', 'Python']
    });
    setRepositories([... repositories, response.data]);
  }

  async function handleRemoveRepository(id) {

    var positionToDelete = null;
    var newRepo = [... repositories];

    for( var i = 0; i < newRepo.length; i++)
    {
      console.log( `Id corrente encontrado: ${id}` );

      if ( newRepo[i].id === id)
      {
        //alert(newRepo[i].id);
        console.log(`Achou o id para deletar: ${id}`)

        //dentro do loop, nao posso apagar, muda a estrutura.
        //newRepo.splice(i, 1);
        positionToDelete = i;
        //se achou saio do loop para continuar.
        break;
      }
    }

    if( positionToDelete != null)
    {
      console.log(`Vai deletar posição do array: ${positionToDelete}`)
      newRepo.splice(positionToDelete, 1);
      //ja utilizei, volto para null
      positionToDelete = null;

      //Somente chamo axios.delete, quando realmente precisar utilizar o recurso de rede.
      //pois encontrou o id no array.
      await axios.delete(`/repositories/${id}`);
    }

    console.log("setando Repositorios para update da interface React....");
    setRepositories(newRepo); 

  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>
          ))
        }
      </ul>

      
    </div>
  );
}

export default App;
