import React from 'react'
import { Form } from 'semantic-ui-react'


class ProductForm extends React.Component {
  defaultValues = { name: '', description: '', price: '', stock: true, }
  state = {...this.defaultValues}

  componentDidMount() {
    if (this.props.id) {
      this.setState({...this.props})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const product = { ...this.state }
    this.props.submit(product)
    this.setState({ ...this.defaultValues})
  }

  handleChange = (e) => {
    const { name, value,} = e.target;
    this.setState({ [name]: value})
  }

  render() {
    const { name, description, price } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <ul>
          <i className="..."></i>
          {' '}
        </ul>
        <Form.Group widths='equal'>
          <Form.Input
            name="name"
            placeholder="Name of Product"
            value={name}
            onChange={this.handleChange}
            requried="true"
          />
          <Form.Input
            name="description"
            placeholder="description"
            value={description}
            onChange={this.handleChange}
            requried="true"
          />
          <Form.Input
            name="price"
            placeholder="price"
            value={price}
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

export default ProductForm;
