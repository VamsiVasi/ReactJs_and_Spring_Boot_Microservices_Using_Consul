import React, { Component } from 'react';
import EmployeeService from '../../services/EmployeeService';

class CreateOrUpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            middleName: '',
            lastName: '',
            dateOfBirth: '',
            address: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeMiddleNameHandler = this.changeMiddleNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeDOBHandler = this.changeDOBHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
        this.viewEmployeeButton = this.viewEmployeeButton.bind(this);
        this.editEmployeeButton = this.editEmployeeButton.bind(this);
        this.cancel = this.cancel.bind(this);
        this.exitButton=this.exitButton.bind(this);
        this.deleteEmployeeButton = this.deleteEmployeeButton.bind(this);
        this.viewTrainingsButton=this.viewTrainingsButton.bind(this);
    }

    componentDidMount() {
        if (this.state.id === "_add") {
            return
        }
        else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    middleName: employee.middleName,
                    lastName: employee.lastName,
                    dateOfBirth: employee.dateOfBirth,
                    address: employee.address
                });
            });
        }
    }

    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth,
            address: this.state.address
        };
        console.log('Employee : ' + JSON.stringify(employee));
        if (this.state.id === "_add") {
            EmployeeService.createEmployee(employee).then(res => {
                this.props.history.push("/employees/_all");
            });
        }
        else {
            EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
                this.props.history.push(`/view-employee/${this.state.id}`);
            });
        }
    }

    viewEmployeeButton(id) {
        this.props.history.push(`/view-employee/${id}`);
    }

    editEmployeeButton(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    cancel() {
        if (this.state.id === "_add") {
            this.props.history.push('/employees/_all');
        }
        else {
            this.props.history.push(`/employee/${this.state.id}`);
        }
    }

    exitButton() {
        this.props.history.push('/employees/_all');
    }

    deleteEmployeeButton(id) {
        EmployeeService.deleteEmployee(id).then((res) => {
            this.props.history.push("/employees/_all");
        });
    }

    viewTrainingsButton(id){
        this.props.history.push(`/trainings/${id}/_all`);
    }

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
    }

    changeMiddleNameHandler = (event) => {
        this.setState({ middleName: event.target.value });
    }

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    }

    changeDOBHandler = (event) => {
        this.setState({ dateOfBirth: event.target.value });
    }

    changeAddressHandler = (event) => {
        this.setState({ address: event.target.value });
    }

    getTitle() {
        if (this.state.id === "_add") {
            return <h3 className="text-center" style={{ marginTop: "18px" }}>Add Employee</h3>;
        }
        else {
            return <h3 className="text-center" style={{ marginTop: "18px" }}>Edit Employee</h3>
        }
    }

    getMenu() {
        if (this.state.id === "_add") {
            return
        }
        else {
            return (
                <div>
                    <h2 className="text-center" style={{ marginTop: "10px" }}>Welcome {this.state.firstName} {this.state.lastName}</h2>
                    <div className="text-center" style={{ marginTop: "20px" }}>
                    <button onClick={() => this.viewEmployeeButton(this.state.id)} className="btn btn-info">View Employee</button>
                        <button onClick={() => this.editEmployeeButton(this.state.id)} className="btn btn-info" style={{ marginLeft: "50px" }}>Edit Employee</button>
                        <button onClick={() => this.viewTrainingsButton(this.state.id)} className="btn btn-info" style={{ marginLeft: "50px" }}>View Trainings</button>
                        <button onClick={() => this.deleteEmployeeButton(this.state.id)} className="btn btn-danger" style={{ marginLeft: "50px" }}>Delete Employee</button>
                        <button className="btn btn-danger" onClick={this.exitButton} style={{ marginLeft: "50px" }}>Exit</button>
                    </div>
                </div>);
        }
    }

    getButton() {
        if (this.state.id === "_add") {
            return <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>;
        }
        else {
            return <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Update</button>;
        }
    }

    render() {
        return (
            <div>
                {
                    this.getMenu()
                }
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    {
                        this.getTitle()
                    }
                    <div className="card-body" style={{ marginTop: "-12px" }}>
                        <form>
                            <div className="form-group">
                                <label>First Name</label>
                                <input placeholder="First Name" name="firstName" className="form-control"
                                    value={this.state.firstName} onChange={this.changeFirstNameHandler}></input>
                            </div>
                            <div className="form-group">
                                <label>Middle Name</label>
                                <input placeholder="Middle Name" name="middleName" className="form-control"
                                    value={this.state.middleName} onChange={this.changeMiddleNameHandler}></input>
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input placeholder="Last Name" name="lastName" className="form-control"
                                    value={this.state.lastName} onChange={this.changeLastNameHandler}></input>
                            </div>
                            <div className="form-group">
                                <label>Date Of Birth</label>
                                <input placeholder="Date Of Birth" name="dateOfBirth" className="form-control"
                                    value={this.state.dateOfBirth} onChange={this.changeDOBHandler}></input>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input placeholder="Address" name="address" className="form-control"
                                    value={this.state.address} onChange={this.changeAddressHandler}></input>
                            </div>
                            {
                                this.getButton()
                            }
                            <button className="btn btn-danger" onClick={this.cancel} style={{ marginLeft: "10px" }}>Cancel</button>
                        </form>
                    </div>
                </div>
                <br></br>
            </div>
        );
    }
}

export default CreateOrUpdateEmployeeComponent;