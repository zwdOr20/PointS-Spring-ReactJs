import { Table, Input, Button, Popconfirm, Form } from 'antd';
import React, { Component } from 'react';
import axios from 'axios';
import "../assets/css/tables.css"
import { API_BASE_URL} from '../constants';

class Promotions extends Component {

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Date Cloture',
        dataIndex: 'cloture',
        width: '30%',
        
      },
      {
        title: 'Date d\'enregistrement',
        dataIndex: 'enregistrement',
      },
      {
        title: 'File',
        dataIndex: 'fileName',
      },
     
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
              <a href="javascript:;">Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: []
      };
 
      }
  componentDidMount(){
      fetch(API_BASE_URL + "/Accueil/venteFlash")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                dataSource: result
              });
            },

            (error) => {
              this.setState({
                error
              });
            }
          );      
  }

handleDelete (id ) {
 
    axios.delete(API_BASE_URL + "/Accueil/promo/"+ id +"/delete");
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.id !== id) }); 
  }
 

  render() {

    const columns = this.columns.map(col => {
        return col;
    });
    const {dataSource} = this.state; 
    return (
      <div>
      <h1 className="page-title title">La liste des promotions et ventes Flash </h1>
        <Table
         
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          rowKey={record => record.id}
        />
      </div>
    );
  }
}


export default Promotions;