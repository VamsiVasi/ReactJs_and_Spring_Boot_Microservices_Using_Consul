import React, { Component } from 'react';
import EmployeeService from '../../services/EmployeeService';

class CreateOrUpdateTrainingComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            empId: this.props.match.params.empId,
            courseId: this.props.match.params.courseId,
            courseName: '',
            code: '',
            score: '',
            timeSpent: '',
            dateOfCompletion: '',
            status: '',
            employee: {}
        }
        this.changeCourseNameHandler = this.changeCourseNameHandler.bind(this);
        this.changeCodeHandler = this.changeCodeHandler.bind(this);
        this.changeScoreHandler = this.changeScoreHandler.bind(this);
        this.changeTimeSpentHandler = this.changeTimeSpentHandler.bind(this);
        this.changeDOCHandler = this.changeDOCHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        this.saveOrUpdateTraining = this.saveOrUpdateTraining.bind(this);
        this.viewTrainingButton = this.viewTrainingButton.bind(this);
        this.editTrainingButton = this.editTrainingButton.bind(this);
        this.cancel = this.cancel.bind(this);
        this.deleteTrainingButton = this.deleteTrainingButton.bind(this);
        this.viewEmployeeButton = this.viewEmployeeButton.bind(this);
        this.editEmployeeButton = this.editEmployeeButton.bind(this);
        this.exitButton = this.exitButton.bind(this);
        this.deleteEmployeeButton = this.deleteEmployeeButton.bind(this);
        this.viewAllTrainingsButton = this.viewAllTrainingsButton.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.empId).then((res) => {
            this.setState({ employee: res.data });
        })
        if (this.state.courseId === "_add") {
            return
        }
        else {
            EmployeeService.getTrainingsByEmpIdAndCourseId(this.state.empId, this.state.courseId).then((res) => {
                let training = res.data;
                this.setState({
                    courseName: training.courseName,
                    code: training.code,
                    score: training.score,
                    timeSpent: training.timeSpent,
                    dateOfCompletion: training.dateOfCompletion,
                    status: training.status
                });
            });
        }
    }

    saveOrUpdateTraining = (e) => {
        e.preventDefault();
        let training = {
            courseName: this.state.courseName,
            code: this.state.code,
            score: this.state.score,
            timeSpent: this.state.timeSpent,
            dateOfCompletion: this.state.dateOfCompletion,
            status: this.state.status
        };
        console.log('Training : ' + JSON.stringify(training));
        if (this.state.courseId === "_add") {
            EmployeeService.createTrainingByEmpId(training, this.state.empId).then(res => {
                this.props.history.push(`/trainings/${this.state.empId}/_all`);
            });
        }
        else {
            EmployeeService.updateTrainingById(training, this.state.empId, this.state.courseId).then((res) => {
                this.props.history.push(`/view-training/${this.state.empId}/${this.state.courseId}`);
            });
        }
    }

    viewTrainingButton(empId, courseId) {
        this.props.history.push(`/view-training/${empId}/${courseId}`);
    }

    editTrainingButton(empId, courseId) {
        this.props.history.push(`/add-training/${empId}/${courseId}`);
    }

    cancel() {
        if (this.state.courseId === "_add") {
            this.props.history.push(`/trainings/${this.state.empId}/_all`);
        }
        else {
            this.props.history.push(`/view-training/${this.state.empId}/${this.state.courseId}`);
        }
    }

    deleteTrainingButton(empId, courseId) {
        EmployeeService.deleteTrainingById(empId, courseId).then((res) => {
            this.props.history.push(`/trainings/${this.state.empId}/_all`);
        });
    }

    viewEmployeeButton(empId) {
        this.props.history.push(`/view-employee/${empId}`);
    }

    editEmployeeButton(empId) {
        this.props.history.push(`/add-employee/${empId}`);
    }

    exitButton() {
        if (this.state.courseId === "_add") {
            this.props.history.push('/employees/_all');
        }
        else {
            this.props.history.push(`/trainings/${this.state.empId}/_all`);
        }
    }

    deleteEmployeeButton(empId) {
        EmployeeService.deleteEmployee(empId).then((res) => {
            this.props.history.push("/employees/_all");
        });
    }

    viewAllTrainingsButton(empId) {
        this.props.history.push(`/trainings/${empId}/_all`);
    }

    changeCourseNameHandler = (event) => {
        this.setState({ courseName: event.target.value });
    }

    changeCodeHandler = (event) => {
        this.setState({ code: event.target.value });
    }

    changeScoreHandler = (event) => {
        this.setState({ score: event.target.value });
    }

    changeTimeSpentHandler = (event) => {
        this.setState({ timeSpent: event.target.value });
    }

    changeDOCHandler = (event) => {
        this.setState({ dateOfCompletion: event.target.value });
    }

    changeStatusHandler = (event) => {
        this.setState({ status: event.target.value });
    }

    getTitle() {
        if (this.state.courseId === "_add") {
            return <h3 className="text-center" style={{ marginTop: "18px" }}>Add Training</h3>;
        }
        else {
            return <h3 className="text-center" style={{ marginTop: "18px" }}>Edit {this.state.courseName} Training</h3>
        }
    }

    getMenu() {
        if (this.state.courseId === "_add") {
            return (
                <div className="text-center" style={{ marginTop: "20px" }}>
                    <button onClick={() => this.viewEmployeeButton(this.state.empId)} className="btn btn-info">View Employee</button>
                    <button onClick={() => this.editEmployeeButton(this.state.empId)} className="btn btn-info" style={{ marginLeft: "50px" }}>Edit Employee</button>
                    <button onClick={() => this.viewAllTrainingsButton(this.state.empId)} className="btn btn-info" style={{ marginLeft: "50px" }}>View Trainings</button>
                    <button onClick={() => this.deleteEmployeeButton(this.state.empId)} className="btn btn-danger" style={{ marginLeft: "50px" }}>Delete Employee</button>
                    <button className="btn btn-danger" onClick={this.exitButton} style={{ marginLeft: "50px" }}>Exit</button>
                </div>
            );
        }
        else {
            return (
                <div className="text-center" style={{ marginTop: "20px" }}>
                    <button onClick={() => this.viewTrainingButton(this.state.empId, this.state.courseId)} className="btn btn-info">View Training</button>
                    <button onClick={() => this.editTrainingButton(this.state.empId, this.state.courseId)} className="btn btn-info" style={{ marginLeft: "50px" }}>Edit Training</button>
                    <button onClick={() => this.deleteTrainingButton(this.state.empId, this.state.courseId)} className="btn btn-danger" style={{ marginLeft: "50px" }}>Delete Training</button>
                    <button className="btn btn-danger" onClick={this.exitButton} style={{ marginLeft: "50px" }}>Exit</button>
                </div>);
        }
    }

    getSaveOrUpdateButton() {
        if (this.state.courseId === "_add") {
            return <button className="btn btn-success" onClick={this.saveOrUpdateTraining}>Save</button>;
        }
        else {
            return <button className="btn btn-success" onClick={this.saveOrUpdateTraining}>Update</button>;
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h2 className="text-center" style={{ marginTop: "10px" }}>Welcome {this.state.employee.firstName} {this.state.employee.lastName}</h2>
                    {
                        this.getMenu()
                    }
                </div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    {
                        this.getTitle()
                    }
                    <div className="card-body" style={{ marginTop: "-12px" }}>
                        <form>
                            <div className="form-group">
                                <label>Course Name</label>
                                <input placeholder="Course Name" name="courseName" className="form-control"
                                    value={this.state.courseName} onChange={this.changeCourseNameHandler}></input>
                            </div>
                            <div className="form-group">
                                <label>Code</label>
                                <input placeholder="Code" name="code" className="form-control"
                                    value={this.state.code} onChange={this.changeCodeHandler}></input>
                            </div>
                            <div className="form-group">
                                <label>Score</label>
                                <input placeholder="Score" name="score" className="form-control"
                                    value={this.state.score} onChange={this.changeScoreHandler}></input>
                            </div>
                            <div className="form-group">
                                <label>Time Spent</label>
                                <input placeholder="Time Spent" name="timeSpent" className="form-control"
                                    value={this.state.timeSpent} onChange={this.changeTimeSpentHandler}></input>
                            </div>
                            <div className="form-group">
                                <label>Date Of Completion</label>
                                <input placeholder="Date Of Completion" name="dateOfCompletion" className="form-control"
                                    value={this.state.dateOfCompletion} onChange={this.changeDOCHandler}></input>
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <input placeholder="Status" name="status" className="form-control"
                                    value={this.state.status} onChange={this.changeStatusHandler}></input>
                            </div>
                            {
                                this.getSaveOrUpdateButton()
                            }
                            <button onClick={this.cancel} className="btn btn-danger" style={{ marginLeft: "10px" }}>Cancel</button>
                        </form>
                    </div>
                </div>
                <br></br>
            </div>
        );
    }
}

export default CreateOrUpdateTrainingComponent;