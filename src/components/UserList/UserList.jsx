import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

let userData = [];

export default class UserList extends Component {
  deleteUser(event, index) {
      let user = userData[index];
      console.log(user);
  }

  componentDidMount(){

  }

  render() {
    const { users, farmers, buyers, wards } = this.props;
   
    let userFound = false;
    userData = [];

    for (let i = 0; i < users.length; i++) {
      userFound = false;
      for (let j = 0; j < farmers.length; j++) {
        if (users[i]?.userId === farmers[j]?.userId) {
          userData.push({
            userNo: users[i].userNo,
            userId: users[i].userId,
            userName:
              farmers[j]?.firstName +
              " " +
              farmers[j]?.givenName +
              " " +
              farmers[j]?.otherName,
            userType: "Farmer",
            userTypeId: 1,
            typeId: farmers[j]?.farmerId,
            nationalId: farmers[j]?.nationalId,
            ward: farmers[j]?.farmerBvs[0]?.ward?.wardName,
          });
          userFound = true;
          break;
        }
      }
      if (!userFound) {
        for (let k = 0; k < buyers.length; k++) {
          if (users[i]?.userId === buyers[k]?.userId) {
            userData.push({
              userNo: users[i].userNo,
              userId: users[i].userId,
              userName:
                buyers[k]?.firstName +
                " " +
                buyers[k]?.givenName +
                " " +
                buyers[k]?.otherName,
              userType: "Trader",
              userTypeId: 2,
              typeId: buyers[k]?.buyerId,
              nationalId: buyers[k]?.nationalId,
              ward: wards?.find(
                (w) => w.wardId === buyers[k]?.buyerContacts[0]?.wardId
              )?.wardName,
            });
            userFound = true;
            break;
          }
        }
      }
      // if(!userFound){
      //     userData.push({
      //         userNo: users[i].userNo,
      //         userId: users[i].userId,
      //         userName: users[i]
      //         userType: "Administrator",
      //         userTypeId: 0,
      //         nationalId: "N/A",
      //         ward: "N/A"
      //     });
      // }
    }

    return (
      <div className="user-details" style={{ height: "100%", width: "100%" }}>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableCell width={70}>Id</TableCell>
              <TableCell width={180}>Name</TableCell>
              <TableCell width={50}>Type</TableCell>
              <TableCell width={100}>National Id</TableCell>
              <TableCell width={120}>Ward</TableCell>
              <TableCell width={50}></TableCell>
            </TableHead>
            <TableBody>
              {userData?.map((row, index) => (
                <TableRow key={row.rowIndex}>
                  <TableCell>{row.userId}</TableCell>
                  <TableCell>{row.userName}</TableCell>
                  <TableCell>{row.userType}</TableCell>
                  <TableCell>{row.nationalId}</TableCell>
                  <TableCell>{row.ward}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      onClick={(event) => this.deleteUser(event, index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
