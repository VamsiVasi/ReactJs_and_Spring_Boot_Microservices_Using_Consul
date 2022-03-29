import React, { Component } from 'react';
import EmployeeService from '../../services/EmployeeService';


class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.match.params.name,
            employees: [],
            search: ''
        };
        this.addEmployee = this.addEmployee.bind(this);
        this.viewEmployee = this.viewEmployee.bind(this);
        this.searchEmployee = this.searchEmployee.bind(this);
        this.changeSearchHandler = this.changeSearchHandler.bind(this);
    }

    componentDidMount() {
        if (this.state.name === "_all") {
            EmployeeService.getEmployees().then(res => {
                this.setState({ employees: res.data });
            });
        }
        else if (this.state.name) {
            EmployeeService.getEmployeesByFirstName(this.state.name).then(res => {
                this.setState({ employees: res.data });
            });
        }
        else {
            EmployeeService.getEmployees().then(res => {
                this.setState({ employees: res.data });
            });
        }
    }

    addEmployee() {
        this.props.history.push('/add-employee/_add');
    }

    viewEmployee(id) {
        this.props.history.push(`/employee/${id}`);
    }

    searchEmployee() {
        if (this.state.search === '') {
            this.props.history.push(`/employees/_all`);
        }
        else {
            this.props.history.push(`/employees/${this.state.search}`);
        }
    }

    changeSearchHandler = (event) => {
        this.setState({ search: event.target.value });
    }

    render() {
        return (
            <div>
                <div className="text-center">
                    <h2 style={{ marginTop: "8px" }}>Employee List</h2>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                    <div className="float-right">
                        <form className="form-inline">
                            <input placeholder="Search" name="search" className="form-control"
                                value={this.state.search} onChange={this.changeSearchHandler}></input>
                            <button className="btn btn-success" onClick={this.searchEmployee} style={{ marginLeft: "10px" }}>Search</button>
                        </form>
                    </div>
                </div>
                <div className="row" style={{ marginTop: "10px" }}>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center">First Name</th>
                                <th className="text-center">Middle Name</th>
                                <th className="text-center">Last Name</th>
                                <th className="text-center">Date Of Birth</th>
                                <th className="text-center">Address</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td className="text-center">{employee.firstName}</td>
                                            <td className="text-center">{employee.middleName}</td>
                                            <td className="text-center">{employee.lastName}</td>
                                            <td className="text-center">{employee.dateOfBirth}</td>
                                            <td className="text-center">{employee.address}</td>
                                            <td className="text-center">
                                                <button onClick={() => this.viewEmployee(employee.id)} className="btn btn-success">View</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


export default ListEmployeeComponent;