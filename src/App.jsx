import {useMemo, useEffect, useState } from 'react'

import './App.css'

const onSubmit = (cb) => {
  return (e) => {
    e.preventDefault()
    cb()
  }
}

const Header = ({add}) => {
  const [nome, setNome] = useState("")
  const handleSubmit = () => {
    // if(nome  !== "") add(nome) possibilidade
    if(nome === "") return;
    
    add(nome)
    setNome("")
  }
  return (
    <header>
      <form onSubmit={onSubmit(handleSubmit)}>
        <input name='nome' type="text" value={nome} onChange={({target}) => setNome(target.value) }/>
        <button disabled={!nome}>Adicionar</button>
      </form>
    </header>
  )
} 

const Content = ({state}) => {
  return (
    <main>
      <ul>
        {state.map((o,idx) => (
          <li key={idx}>{o}</li>
        ))}
      </ul>
    </main>
  )
}

function App() {
  const localState = JSON.parse(localStorage.getItem('state'))
  const [state, setState] = useState(localState || [])
  
  const add = (v) => setState([...state, v])

  const limpar = () => {localStorage.clear(); setState([])}

  const tamanho = useMemo(() => {
    return state.length
  }, [state])

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state))
  }, [state])
  return (
    <>
    <Header add={add}/>
    <aside>{tamanho}</aside>
    <Content state={state}/>
    <footer>
      <button type='button' onClick={limpar}>Limpar</button>
    </footer>
    </>
  )
}

export default App
