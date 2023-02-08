import { useState } from 'react'
import { useField } from './hooks'
import { Form, Navbar, Nav } from 'react-bootstrap'
import {
  Container, Table, TableBody, TableCell, TableContainer, TableRow, Paper, TextField, Button, AppBar, Toolbar, Alert, IconButton
} from '@mui/material'

// react router
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'

const Menu = () => {

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'></IconButton>
          <Button color='inherit' component={Link} to='/anecdotelist'>
            Anecdote List
          </Button>

          <Button color='inherit' component={Link} to='/createnew'>
            Create New
          </Button>

          <Button color='inherit' component={Link} to='/about'>
            About
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  // const id = useParams().id
  // const anecdoteDisplay = anecdote.find(element => element.id === Number(id))

  return (
    <div>
      <Container>
        <h2>Content: {anecdote.content}</h2>
        <br></br>
        <div>
          Author: {anecdote.author}
          <br></br>
          Info: {anecdote.info}
        </div>
      </Container>
    </div>
  )
}

//display list of anecdotes
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {anecdotes.map(anecdote =>
            <TableRow key={anecdote.id} >
              <TableCell>
                <Link to={`/anecdotelist/${anecdote.id}`}>{anecdote.content}
                </Link>
              </TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  </div >
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
    <Container>
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>

      <em>An anecdote is a brief, revealing account of an individual person or an incident.
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
        An anecdote is "a story with a point."</em>

      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </Container>
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
      <Alert severity='success'>
        {message}
      </Alert >
    )
  }
  return notification
}


//form create new anecdote
const CreateNew = (props) => {

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigateAfterSumbit = useNavigate()

  // submit form function
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
      <h2>Create a new anecdote:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label='content' name='content'
            value={content.value} type={content.type}
            onChange={content.onChange} />
        </div>
        <br></br>
        <div>
          <TextField label='author' name='author'
            value={author.value} type={author.type}
            onChange={author.onChange} />
        </div>
        <br></br>
        <div>
          <TextField label='info' name='info'
            value={info.value} type={info.type}
            onChange={info.onChange} />
        </div>
        <br></br>
        <Button variant='contained' color='primary' type='submit'>
          create
        </Button>
        <span> </span>
        <Button variant='contained' color='secondary' type='reset' onClick={() => {
          content.reset();
          author.reset();
          info.reset();
        }}>
          Clear Fields
        </Button>
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
      <Container>
        <h1>Software anecdotes</h1>

        <AppBar position='static'>
          <Toolbar>
            <IconButton edge='start' color='inherit' aria-label='menu'></IconButton>
            <Button color='inherit' component={Link} to='/menu'>
              Menu
            </Button>

            <Button color='inherit' component={Link} to='/users'>
              Users
            </Button>

            {user
              ? <em>{user} logged in</em>
              : <Button color='inherit' component={Link} to='/login'>
                Login
              </Button>
            }
          </Toolbar>
        </AppBar>

        <Container>
          <Notification message={notification} />
        </Container>

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
      </Container>
    </div>
  )
}

export default App
