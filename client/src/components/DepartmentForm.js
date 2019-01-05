import React from 'react'
import { Form } from 'semantic-ui-react'


class DepartmentForm extends React.Component {
  defaultValues = { title: ''}
  state = {...this.defaultValues}

  componentDidMount() {
    if (this.props.id) {
      this.setState({...this.props})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const department = { ...this.state }
    this.props.submit(department)
    this.setState({ ...this.defaultValues})
  }

  handleChange = (e) => {
    const { name, value,} = e.target;
    this.setState({ [name]: value})
  }

  render() {
    const { title } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <ul>
          <i className="..."></i>
          {' '}
        </ul>
        <Form.Group widths='equal'>
          <Form.Input
            name="title"
            placeholder="Name of Department"
            value={title}
            onChange={this.handleChange}
            requried="true"
          />
        </Form.Group>
        <Form.Button type='submit' color='black' size='mini'>Submit</Form.Button>
        <ul>
          <i className="..."></i>
          {' '}
        </ul>
      </Form>
    )
  }

}

export default DepartmentForm;
