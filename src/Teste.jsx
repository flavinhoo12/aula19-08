import { useEffect, useReducer } from "react"

const initialState = { nome: '', autenticado: false }

const CHANGE = "CHANCHE"
const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"

const login = (nome) => ({ type: LOGIN, payload: { nome } })
const logout = () => ({ type: LOGOUT })
const change = (nome) => ({type: CHANGE, payload: { nome }})

const reducer = (state, { type, payload }) => {
    switch (type) {
        case LOGIN: {
            const { nome } = payload
            return { ...state, nome, autenticado: true }
        }
        case LOGOUT: return initialState
        case CHANGE: {
            if(!state.autenticado) return state
            const {nome} = payload
            return {...state, nome}
    }
        default: return state
    }
}

export default function () {
    const localState = JSON.parse(localStorage.getItem('state'))
    const [state, dispath] = useReducer(reducer, localState || initialState)

    const signIn = () => dispath(login("Flávio"))
    const signOut = () => dispath(logout())
    const changeNome = ()=> dispath(change("Azzi"))

    useEffect(() => {
        localStorage.setItem('state', JSON.stringify(state))
    }, [state])
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {state.autenticado ? state.nome + ' está autenticado!' : 'Você não está autenticado!'}
            <button type="button" onClick={signIn}>Autenticar</button>
            <button type="button" onClick={signOut}>Sair</button>
            <button type="button" onClick={changeNome}>Trocar o Nome</button>
        </div>
    )
}