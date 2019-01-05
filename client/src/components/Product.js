import React from "react";
import axios from 'axios';
import { Button, Header, Icon } from 'semantic-ui-react';
import ReviewForm from './ReviewForm';
import Review from './Review';
import ProductForm from './ProductForm';


class Product extends React.Component {
  state = { department:{}, product: {}, reviews: [], showForm: false }

  componentDidMount() {
    const { id, department_id } = this.props.match.params;
    axios.get(`/api/departments/${department_id}`)
      .then( res => {
        this.setState({ department: res.data})
      });
    axios.get(`/api/departments/${department_id}/products/${id}`)
      .then( res => {
        this.setState({ product: res.data, })
      })
    axios.get(`/api/departments/${department_id}/products/${id}/reviews`)
      .then( res => {
        this.setState({ reviews: res.data, })
      })
  }

  toggleEdit = () => {
      this.setState( state => {
        return { edit: !this.state.edit}
      })
    }

    showProduct = () => {
      const { product: { name, description, price, stock } } = this.state
      return (
        <div>
          <Header style={{'fontSize': '50px'}}>{name}</Header>
          <p>Description of Product: {description}</p>
          <p>Price: ${price}</p>
          <p>{stock}</p>
        </div>
      )
    }

    editProduct = () => {
      return <ProductForm {...this.state.product} submit={this.submitProduct}/>
    }

    deleteProduct = (department_id, id) => {
      const remove = window.confirm("Are you sure you want to delete this Product?")
      if (remove)
      axios.delete(`/api/departments/${department_id}/products/${id}`)
      .then(res => {
        this.props.history.push(`/api/departments/${department_id}`);
        })
    }

    submitProduct = (product) => {
      const { id, department_id } = this.props.match.params;
      axios.put(`/api/departments/${department_id}/products/${id}`, { product })
        .then(res => {
          this.setState({ product: res.data, edit: false })
        })
    }

  toggleForm = () => {
    this.setState(state => {
      return { showForm: !state.showForm }
    })
  }
  form = () => {
    return <ReviewForm submit={this.submit} />
  }
  submit = (review) => {
    const { department_id, id } = this.props.match.params;
    axios.post(`/api/departments/${department_id}/products/${id}/reviews`, { review })
      .then(res => {
        this.setState({ reviews: [res.data, ...this.state.reviews], showForm: false})
      })
  }
  listReviews = () => {
    return this.state.reviews.map( r => (
    <Review key={r.id} { ...r } />
  ))
}

  render() {
    const { product: { department_id, id }, showForm, edit } = this.state
    return (

      <div>
      {edit ? this.editProduct() : this.showProduct()}
      <Button onClick={this.toggleEdit} size='mini'>{ edit? 'Cancel' : 'Edit' }</Button>
      <Button
        icon
        color="black"
        size="mini"
        onClick={() => this.deleteProduct(department_id, id)}
       >
        <Icon name="trash alternate outline" />
      </Button>
      <br />
      <br />

        <Button onClick={this.toggleForm} size='tiny'>{ showForm ? 'Hide' : 'Create New Review'}</Button>
        {showForm ? this.form() : this.listReviews()}
      </div>
    )
  }
}

export default Product
