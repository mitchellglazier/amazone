import React from 'react'
import { Form } from 'semantic-ui-react'


class ReviewForm extends React.Component {
  defaultValues = { subject: '', body: '', stars: '', date: '', }
  state = {...this.defaultValues}

  componentDidMount() {
    if (this.props.id) {
      this.setState({...this.props})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const review = { ...this.state }
    this.props.submit(review)
    this.setState({ ...this.defaultValues})
  }

  handleChange = (e) => {
    const { name, value,} = e.target;
    this.setState({ [name]: value})
  }

  render() {
    const { subject, body, stars, date } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <ul>
          <i className="..."></i>
          {' '}
        </ul>
        <Form.Group widths='equal'>
          <Form.Input
            name="subject"
            placeholder="Review Subject"
            value={subject}
            onChange={this.handleChange}
            requried="true"
          />
          <Form.Input
            name="body"
            placeholder="Leave Review Here"
            value={body}
            onChange={this.handleChange}
            requried="true"
          />
          <Form.Input
            name="stars"
            placeholder="Rate this product 1-5"
            value={stars}
            onChange={this.handleChange}
            requried="true"
          />
          <Form.Input
            name="date"
            placeholder="Month/Day/Year"
            value={date}
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

export default ReviewForm;
