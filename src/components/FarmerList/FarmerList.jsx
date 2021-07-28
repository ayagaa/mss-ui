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

let farmerData = [];

export default class FarmerList extends Component {
  deleteFarmer(event, index) {
    let farmer = farmerData[index];
  }

  componentDidMount() {}

  render() {
    const { farmers, wards, valueChains, showAll } = this.props;

    farmerData = [];
    let farmerBvs = "";

    for (let i = 0; i < farmers.length; i++) {
      farmerBvs = "";
      for (let j = 0; j < farmers[i]?.farmerBvs.length; j++) {
        for (let k = 0; k < valueChains?.length; k++) {
          if (
            farmers[i]?.farmerBvs[j]?.bv?.valueChainId ===
            valueChains[k]?.valueChainId
          ) {
            farmerBvs =
              farmerBvs +
              valueChains[k]?.valueChain +
              "-" +
              farmers[i]?.farmerBvs[j]?.bv?.bvName +
              ",";
            break;
          }
        }
      }

      farmerData.push({
        farmerId: farmers[i]?.farmerId,
        farmerName:
          farmers[i]?.firstName +
          " " +
          farmers[i]?.givenName +
          " " +
          farmers[i]?.otherName,
        nationalId: farmers[i]?.nationalId,
        userId: farmers[i]?.userId,
        ward: farmers[i]?.farmerBvs[0]?.ward?.wardName,
        contacts: farmers[i]?.farmerContacts[0]?.contactNo,
        farmerBvs: farmerBvs,
      });
    }

    if (showAll) {
      return (
        <div
          className="farmer-details"
          style={{ height: "100%", width: "100%" }}
        >
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableCell width={70}>National Id</TableCell>
                <TableCell width={180}>Name</TableCell>
                <TableCell width={50}>Contacts</TableCell>
                <TableCell width={180}>Ward</TableCell>
                <TableCell width={70}>User Id</TableCell>
                <TableCell width={180}>Varieties</TableCell>
                <TableCell width={20}></TableCell>
              </TableHead>
              <TableBody>
                {farmerData?.map((row, index) => (
                  <TableRow key={row.rowIndex}>
                    <TableCell>{row.nationalId}</TableCell>
                    <TableCell>{row.farmerName}</TableCell>
                    <TableCell>{row.contacts}</TableCell>
                    <TableCell>{row.ward}</TableCell>
                    <TableCell>{row.userId}</TableCell>
                    <TableCell>{row.farmerBvs}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        onClick={(event) => this.deleteFarmer(event, index)}
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
    } else {
      return (
        <div
          className="farmer-details"
          style={{ height: "100%", width: "100%" }}
        >
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableCell width={180}>Name</TableCell>
                <TableCell width={180}>Contacts</TableCell>
                <TableCell width={180}>Ward</TableCell>
                <TableCell width={180}>Varieties</TableCell>
              </TableHead>
              <TableBody>
                {farmerData?.map((row, index) => (
                  <TableRow key={row.rowIndex}>
                    <TableCell>{row.farmerName}</TableCell>
                    <TableCell>{row.contacts}</TableCell>
                    <TableCell>{row.ward}</TableCell>
                    <TableCell>{row.farmerBvs}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    }
  }
}
