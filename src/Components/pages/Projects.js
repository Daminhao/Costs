import { useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'

import Message from '../layout/Message.js'
import Container from '../layout/Container'
import Loading from '../layout/Loading.js'
import LinkButton from '../layout/LinkButton.js'
import ProjectCard from '../project/ProjectCard'

import styles from './Projects.module.css'
import { remove } from 'lodash'

function Projects() {
  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('')

  const location = useLocation()
  let message = ''
  if (location.state) {
    message = location.state.message
  }

  useEffect(() => {

    fetch ('http://localhost:5000/projects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(data)
        setRemoveLoading(true)
      })
      .catch((err) => console.log(err))
  }, [])


function removeProject(id){

  fetch(`http://localhost:5000/projects/${id}`,{
  method: 'DELETE',
  headers: {
    'Content-Type':'apllication/json' 
  },
}).then(resp => resp.json())
  .then(data => {
    setProjects(projects.filter((project) => project.id !== id))
    setProjectMessage('Projeto removido com sucesso!')
})

}

  return (
  <div className={styles.project_container}>
    <div className={styles.title_contanier}>
      <h1>Meus Projetos</h1>
      <LinkButton to="/newproject" text ="Criar Projeto" />
    </div>
    {message && <Message type="success" msg={message} />}
    <Container customClass = "start">
    {projects.length > 0 &&
      projects.map((project) => ( 
      <ProjectCard
        id={project.id}
        name={project.name}
        budget={project.budget}
        category={project.category.name}
        key={project.id} 
        handlerRemove={removeProject}
      />
      ))}
      {!removeLoading && <Loading />}
      {removeLoading && projects.lenght === 0 &&(
        <p>Não há projetos cadastrados!</p>
      )}
    </Container>
    </div>
  )
}

export default Projects