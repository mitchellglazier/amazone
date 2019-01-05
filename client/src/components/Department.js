import React from "react";
import ProductForm from './ProductForm';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Header, Icon } from 'semantic-ui-react';
import DepartmentForm from './DepartmentForm'


class Department extends React.Component {
  state = { department:{}, products: [], showForm: false }
  componentDidMount() {
    const { id, } = this.props.match.params;
    axios.get(`/api/departments/${id}`)
      .then( res => {
        this.setState({ department: res.data})
      });
    axios.get(`/api/departments/${id}/products`)
      .then( res => {
        this.setState({ products: res.data, })
      })
  }

  toggleEdit = () => {
      this.setState( state => {
        return { edit: !this.state.edit}
      })
    }

    showDepartment = () => {
      const { department: { title } } = this.state
      return (
        <div>
          <Header style={{'fontSize': '50px'}}>{title}</Header>
        </div>
      )
    }

    editDepartment = () => {
      return <DepartmentForm {...this.state.department} submit={this.submitDepartment}/>
    }

    deleteDepartment = (id) => {
      const remove = window.confirm("Are you sure you want to delete this Department?")
      if (remove)
      axios.delete(`/api/departments/${id}`)
      .then(res => {
        this.props.history.push("/departments");
        })
    }

    submitDepartment = (department) => {
      axios.put(`/api/departments/${this.props.match.params.id}`, { department })
        .then(res => {
          this.setState({ department: res.data, edit: false })
        })
    }

  toggleForm = () => {
    this.setState(state => {
      return { showForm: !state.showForm }
    })
  }
  form = () => {
    return <ProductForm submit={this.submit} />
  }
  submit = (product) => {
    const { id, } = this.props.match.params;
    axios.post(`/api/departments/${id}/products`, { product })
      .then(res => {
        this.setState({ products: [res.data, ...this.state.products], showForm: false})
      })
  }
  listProducts = () => {
    const { id, } = this.props.match.params;
    return this.state.products.map( p => {
      return (
        <ul key={p.id}>
          <li>
            <Link style={{'fontSize': '20px'}} to={`/departments/${id}/products/${p.id}`}>{p.name}</Link>
          </li>
        </ul>
      )
    })
  }
  render() {
    const { department: { id }, edit, showForm } = this.state
    return (
      <div>
      {edit ? this.editDepartment() : this.showDepartment()}
      <Button onClick={this.toggleEdit} size='mini'>{ edit? 'Cancel' : 'Edit' }</Button>
      <Button
        icon
        color="black"
        size="mini"
        onClick={() => this.deleteDepartment(id)}
       >
        <Icon name="trash alternate outline" />
      </Button>
      <br />
      <br />
        <Button onClick={this.toggleForm} size='tiny'>{ showForm ? 'Hide' : 'Create New Product'}</Button>
        {showForm ? this.form() : this.listProducts()}
      </div>
    )
  }
}

export default Department
