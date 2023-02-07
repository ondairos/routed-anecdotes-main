import { useState } from 'react'
import { useField } from './hooks'

// react router
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'

const Menu = () => {

  return (
    <div>
      <Link to='/anecdotelist'>Anecdote List </Link>||
      <Link to='/createnew'>Create New </Link>||
      <Link to='/about'>About </Link>||
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  // const id = useParams().id
  // const anecdoteDisplay = anecdote.find(element => element.id === Number(id))

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

const Notification = ({ message }) => {
  let notification = ''

  if (message) {
    notification = (
      <div>
        {message}
      </div>
    )
  }
  return notification
}


const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigateAfterSumbit = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigateAfterSumbit('/anecdotelist')
    // Pass the message to App component
    props.notifyWith(`a new anecdote: ${content.value} created!`)

    // // Clear the input
    // setContent('');

  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input type={content.type} name='content' value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input name='author' type={author.type} value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input name='info' type={info.type} value={info.value} onChange={info.onChange} />
        </div>
        <button type='submit'>create</button>
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

  // login set state
  const login = (user) => {
    setUser(user)
  }

  // set notification message
  const notifyWith = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(''), 5000)
  }

  // const anecdoteById = (id) => anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(anecdote => anecdote.id === id ? voted : anecdote))
  // }

  // useMatch for individual anecdote,Every time the component is rendered, so practically every time the browser's URL changes, the following command is executed
  const matchAnecdote = useMatch('/anecdotelist/:id')
  const anecdote = matchAnecdote ? anecdotes.find(element => element.id === Number(matchAnecdote.params.id)) : null


  return (
    <div>
      <h1>Software anecdotes</h1>
      {/* <Menu />
      <AnecdoteList anecdotes={anecdotes} />
      <About />
      <CreateNew addNew={addNew} />
      <Footer /> */}


      <div>
        <Link to='/menu'>Menu </Link>||
        <Link to='/users'>Users </Link>||
        {user ? <em>{user} logged in</em> : <Link to="/login">login</Link>}
      </div>
      <div>
        <Notification message={notification} />
      </div>
      {/* The Routes works by rendering the first component whose path matches the URL in the browser's address bar. */}
      <Routes>
        <Route path='/anecdotelist/:id' element={<Anecdote anecdote={anecdote} />} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/anecdotelist' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/about' element={<About />} />
        <Route path='/createnew' element={<CreateNew addNew={addNew} notifyWith={notifyWith} />} />
        {/* <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} /> */}
        <Route path="/login" element={<Login onLogin={login} />} />
      </Routes>

      <br></br>
      <hr></hr>
      <Footer></Footer>
    </div>
  )
}

export default App
