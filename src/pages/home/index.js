// entre chave a gente importa o componente que queremos de determinada pasta/arquivo
import { useState } from 'react';
import {Header} from '../../components/Header';
import background from '../../assets/background.png';
import './styles.css';
import ItemList from '../../components/ItemList';

function App() {
  const [user,setUser] = useState('');
  const [currentuser,setCurrentUser] = useState(null);
  const[repos, setRepos] = useState(null);
  // a função é async pq é uma função que faz uma requisição para um API externo e nao sabemos quanto tempo vai demorar
  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.name){
      const{avatar_url,name,bio,login} = newUser;
      setCurrentUser({avatar_url,name,bio,login})

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length){
        setRepos(newRepos)
      }
    }
  };

  return (
    <div className="App">
      <Header/>
      <div className='conteudo'>
        <img src={background} className='background' alt = "background app"/>
        <div className='info'> 
         <div>
          <input name="usuario" value={user} onChange={(event)=> setUser(event.target.value)} placeholder='@username'/>
          <button onClick={handleGetData}> Buscar</button>
         </div>
         {currentuser?.name ? (<>
          <div className='perfil'>
            <img src ={currentuser.avatar_url} className='profile' alt='iamgem de perfil' />
            <div>
              <h3> {currentuser.name} </h3>
              <span> {currentuser.login}</span>
              <p> {currentuser.bio} </p>
              
            </div>
         </div>
         <hr/>
         </>
         ): null}
         {repos?.length ?(
         <div> 
          <h4 className=' repositorio'> Repositórios</h4>
          {repos.map(repos =>( 
            <ItemList title = {repos.name} description={repos.description}/>
           
            ))}
          
         </div>
         ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
