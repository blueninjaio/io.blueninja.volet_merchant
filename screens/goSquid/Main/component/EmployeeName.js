import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { dev, prod, url } from '../../../../config'

export class EmployeeName extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         name: ''
      }
    }

    componentDidMount = () => {
        fetch(`${url}/api/user/check`, {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
              employeeNo: this.props.employeeNo,
            })
          })
          .then(res => res.json())
          .then((data) => {
            if(data.success){
              this.setState({name: data.user[0].name})
            }
          })
          .catch((error) =>{
              console.error(error);
          })
    }
    
    
  render() {
    return (
        <Text>{this.state.name}</Text>
    )
  }
}

export default EmployeeName
