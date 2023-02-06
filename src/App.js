import { useState } from 'react'

// react router
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <a href='#' style={padding}>anecdotes</a>
      <a href='#' style={padding}>create new</a>
      <a href='#' style={padding}>about</a>
    </div>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(element => element.id === Number(id))

  return (
    <div>
      <h2>Content: {anecdote.content}</h2>
      <br></br>
      <div>
        Author: {anecdote.author}
        <br></br>
        Info: {anecdote.info}
      </div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotelist/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmitForm = (event) => {
    event.preventDefault()
    props.onLogin('JohnK')
    navigate('/')
  }

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={onSubmitForm}>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type='password' />
        </div>
        <div>
          <button type='submit'>login</button>
        </div>
      </form>
    </div>
  )
}

// other comps
const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    Ioannis Kantiloros 2023.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [user, setUser] = useState('')
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(anecdote => anecdote.id === id ? voted : anecdote))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      {/* <Menu />
      <AnecdoteList anecdotes={anecdotes} />
      <About />
      <CreateNew addNew={addNew} />
      <Footer /> */}

      <Router>
        <div>
          <Link to='/menu'>Menu </Link>||
          <Link to='/anecdotelist'>Anecdote List </Link>||
          <Link to='/about'>About </Link>||
          <Link to='/createnew'>Create New </Link>||
          <Link to='/users'>Users </Link>||
          {user ? <em>{user} logged in</em> : <Link to="/login">login</Link>}
        </div>

        {/* The Routes works by rendering the first component whose path matches the URL in the browser's address bar. */}
        <Routes>
          <Route path='/anecdotelist/:id' element={<Anecdote anecdotes={anecdotes} />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/anecdotelist' element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path='/about' element={<About />} />
          <Route path='/createnew' element={<CreateNew addNew={addNew} />} />
        </Routes>
      </Router>

      <Footer></Footer>
    </div>
  )
}

export default App