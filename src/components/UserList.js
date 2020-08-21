import React, { Component, Fragment } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "../assets/css/dataTable.css";
import "../assets/css/styles.css";
import searchIcon from "../assets/images/search-24px.svg";
import editIcon from "../assets/images/edit-24px.svg";
import deleteIcon from "../assets/images/delete-24px.svg";

import { connect } from "react-redux";
import { fetchUsersList } from "../store/actions/usersActions";

/* const columns = [
  { dataField: "firstName", text: "First Name" },
  { dataField: "lastName", text: "Last Name" },
  { dataField: "email", text: "Email" },
  { dataField: "city", text: "City" },
  { dataField: "state", text: "State" },
  { dataField: "phoneNumber", text: "Phone Number" },
  { dataField: "emailSubscription", text: "Email Subscription" },
  { dataField: "status", text: "Status" },
  { dataField: "createdOn", text: "Created On" },
  { dataField: "updatedOn", text: "Updated On" }
]; */

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      usersList: [],
      statesType: {
        Mumbai: "Mumbai",
        Pune: "Pune",
        Delhi: "Delhi",
        Nagaland: "Nagaland",
        Rajasthan: "Rajasthan",
        Himachal: "Himachal"
      },
      emailSubscriptionType: {
        true: "Yes",
        false: "No"
      },
      statusType: {
        true: "Active",
        false: "Inactive"
      }
    };
  }

  componentDidMount() {
    this.props.fetchUsersList();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ usersList: nextProps.userList, isLoaded: true });
  }

  enumFormatter = (cell, row, enumObject) => {
    return enumObject[cell];
  };

  cellIconFormatter = (cell, row, obj) => {
    const faIcon =
      obj[cell] === "Yes" || obj[cell] === "Active" ? "fa-check" : "fa-times";
    return `<i class="fa ${faIcon}" aria-hidden=${cell} />`;
  };

  actionFormatter = (cell, row, obj) => {
    return (
      <Fragment>
        <img
          onClick={() => console.log("Clicked Search " + cell)}
          src={searchIcon}
          alt="search icon"
          width="16"
          height="16"
        />
        <img
          onClick={() => console.log("Clicked Edit " + cell)}
          alt="edit icon"
          src={editIcon}
          width="16"
          height="16"
        />
        <img
          onClick={() => console.log("Clicked Delete " + cell)}
          alt="delete icon"
          src={deleteIcon}
          width="16"
          height="16"
        />
      </Fragment>
    );
  };

  renderShowsTotal(start, to, total) {
    return (
      <div>
        Displaying {start}-{to} of {total} result(s)
      </div>
    );
  }

  /* renderSizePerPageDropDown = props => {
    return (
      <div className="btn-group">
        <select className={`btn btn-info`} onChange={this.changeSizePerPage}>
          {[10, 25, 30].map((n, idx) => {
            const isActive = n === props.currSizePerPage ? "active" : null;
            return <option key={idx}>{n}</option>;
          })}
        </select>
      </div>
    );
  }; */

  changeSizePerPage = (e, props) => {
    props.changeSizePerPage(e.target.value);
  };

  changePage = (e, props) => {
    props.changePage(e.target.value);
  };

  renderPaginationPanel = props => {
    console.log(props);
    const jumpToPage = Array.from(
      { length: props.totalPages },
      (v, i) => i + 1
    );
    return (
      <div>
        <div>
          <span>{props.components.totalText}</span>
          {props.components.pageList}
        </div>
        <div>
          <span>Page Size :</span>
          <select
            className={`btn btn-info`}
            onChange={e => this.changeSizePerPage(e, props)}
          >
            {props.sizePerPageList.map((n, idx) => {
              // const isActive = n === props.currSizePerPage ? "active" : null;
              return <option key={idx}>{n}</option>;
            })}
          </select>
        </div>
        <div>
          Jump to
          <select
            className={`btn btn-info`}
            onChange={e => this.changePage(e, props)}
          >
            {jumpToPage.map((n, idx) => {
              // const isActive = n === props.currSizePerPage ? "active" : null;
              return <option key={idx}>{n}</option>;
            })}
          </select>
        </div>
      </div>
    );
  };

  // <FA icon={faCheck} />
  render() {
    const {
      usersList,
      statesType,
      emailSubscriptionType,
      statusType
    } = this.state;

    const options = {
      defaultSortName: "id",
      defaultSortOrder: "asc",
      page: 1, // which page you want to show as default
      sizePerPage: 10, // which size per page you want to locate as default
      sizePerPageList: [10, 25, 50, 100],
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3, // the pagination bar size.
      prePage: "Prev", // Previous page button text
      nextPage: "Next", // Next page button text
      firstPage: "First", // First page button text
      lastPage: "Last", // Last page button text
      paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      // sizePerPageDropDown: this.renderSizePerPageDropDown,
      paginationPanel: this.renderPaginationPanel,
      paginationPosition: "top" // default is bottom, top and both is all available
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
    };

    const selectRowProp = {
      mode: "checkbox",
      clickToSelect: false
      // bgColor: "rgb(220 228 171 / 73%)"
    };
    return (
      <div className="container">
        <BootstrapTable
          /* fetchInfo={{ dataTotalSize: 10 }}
          remote */
          data={usersList}
          options={options}
          selectRow={selectRowProp}
          striped
          hover
          pagination
        >
          <TableHeaderColumn dataField="userId" dataSort isKey hidden>
            Product ID
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="firstName"
            dataSort
            filter={{ type: "TextFilter", delay: 1000 }}
          >
            First Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="lastName"
            dataSort
            filter={{ type: "TextFilter", delay: 1000 }}
          >
            Last Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="email"
            dataSort
            filter={{ type: "TextFilter", delay: 1000 }}
          >
            Email
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="city"
            dataSort
            filter={{ type: "TextFilter", delay: 1000 }}
          >
            City
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="state"
            dataSort
            dataFormat={this.enumFormatter}
            filterFormatted
            formatExtraData={statesType}
            filter={{
              type: "SelectFilter",
              options: statesType
            }}
          >
            State
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="phoneNumber"
            dataSort
            filter={{ type: "TextFilter", delay: 1000 }}
          >
            Phone Number
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="emailSubscription"
            dataSort
            dataFormat={this.cellIconFormatter}
            dataAlign="center"
            filterFormatted
            formatExtraData={emailSubscriptionType}
            filter={{
              type: "SelectFilter",
              options: emailSubscriptionType
            }}
          >
            Email Subscription
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="status"
            dataSort
            dataFormat={this.cellIconFormatter}
            dataAlign="center"
            filterFormatted
            formatExtraData={statusType}
            filter={{
              type: "SelectFilter",
              options: statusType
            }}
          >
            Status
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="createdOn"
            dataSort
            filter={{ type: "TextFilter", delay: 1000 }}
          >
            Created On
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="updatedOn"
            dataSort
            filter={{ type: "TextFilter", delay: 1000 }}
          >
            Updated On
          </TableHeaderColumn>
          <TableHeaderColumn dataField="id" dataFormat={this.actionFormatter}>
            Action
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userList: state.users.data
  };
};

export default connect(mapStateToProps, { fetchUsersList })(UserList);
