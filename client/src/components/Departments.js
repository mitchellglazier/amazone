import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DepartmentForm from './DepartmentForm'
import { Button } from 'semantic-ui-react'

class Departments extends React.Component {
  state = { departments:[], showForm: false }
  componentDidMount() {
    axios.get('/api/departments')
    .then(res => {
      this.setState({ departments: res.data})
    })
  }
  toggleForm = () => {
    this.setState(state => {
      return { showForm: !state.showForm }
    })
  }
  form = () => {
    return <DepartmentForm submit={this.submit} />
  }
  submit = (department) => {
    axios.post('/api/departments', { department })
      .then(res => {
        this.setState({ departments: [res.data, ...this.state.departments], showForm: false})
      })
  }
  listDepartments = () => {
    return this.state.departments.map( d => {
      return (
        <ul key={d.id}>
          <li>
            <Link style={{'fontSize': '20px'}} to={`/departments/${d.id}`}>{d.title}</Link>
          </li>
        </ul>
      )
    })
  }
  render() {
    const { showForm } = this.state
    return (
      <div>
        <h2 style={{'fontSize': '50px'}}>Departments</h2>
        <Button onClick={this.toggleForm} size='tiny'>{ showForm ? 'Hide' : 'Create New Department'}</Button>
        {showForm ? this.form() : this.listDepartments()}
      </div>
    )
  }
}

export default Departments
