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

let buyerData = [];

export default class BuyerList extends Component {
  deleteBuyer(event, index) {
    let buyer = buyerData[index];
  }

  componentDidMount() {}

  render() {
    const { buyers, wards, valueChains, showAll } = this.props;

    buyerData = [];
    let buyerBvs = "";

    for (let i = 0; i < buyers.length; i++) {
      buyerBvs = "";
      for (let j = 0; j < buyers[i]?.buyerPreferences.length; j++) {
        for (let k = 0; k < valueChains?.length; k++) {
          for (let m = 0; m < valueChains[k].breedVarieties.length; m++) {
            let valueChainDetails = valueChains?.find(
              (v) =>
                v.valueChainId ===
                valueChains[k]?.breedVarieties[m]?.valueChainId
            )?.valueChain;
            let variety = valueChains[k]?.breedVarieties[m]?.bvName;
            if (
              buyers[i]?.buyerPreferences[j]?.bvId ===
              valueChains[k]?.breedVarieties[m]?.bvId
            ) {
              buyerBvs = buyerBvs + valueChainDetails + "-" + variety + ",";
              break;
            }
          }
        }
      }

      buyerData.push({
        buyerId: buyers[i]?.buyerId,
        buyerName:
          buyers[i]?.firstName +
          " " +
          buyers[i]?.givenName +
          " " +
          buyers[i]?.otherName,
        nationalId: buyers[i]?.nationalId,
        userId: buyers[i]?.userId,
        ward: wards?.find(
          (w) => w.wardId === buyers[i]?.buyerContacts[0]?.wardId
        )?.wardName,
        contacts: buyers[i]?.buyerContacts[0]?.contactNo,
        buyerBvs: buyerBvs,
      });
    }

    if(!showAll){
        return (
            <div
              className="farmer-details"
              style={{ height: "100%", width: "100%" }}
            >
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableCell width={180}>Name</TableCell>
                    <TableCell width={50}>Contacts</TableCell>
                    <TableCell width={180}>Ward</TableCell>
                    <TableCell width={180}>Varieties</TableCell>
                    <TableCell width={20}></TableCell>
                  </TableHead>
                  <TableBody>
                    {buyerData?.map((row, index) => (
                      <TableRow key={row.rowIndex}>
                        <TableCell>{row.buyerName}</TableCell>
                        <TableCell>{row.contacts}</TableCell>
                        <TableCell>{row.ward}</TableCell>
                        <TableCell>{row.buyerBvs}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          );
    }else{
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
                    {buyerData?.map((row, index) => (
                      <TableRow key={row.rowIndex}>
                        <TableCell>{row.nationalId}</TableCell>
                        <TableCell>{row.buyerName}</TableCell>
                        <TableCell>{row.contacts}</TableCell>
                        <TableCell>{row.ward}</TableCell>
                        <TableCell>{row.userId}</TableCell>
                        <TableCell>{row.buyerBvs}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="delete"
                            color="primary"
                            onClick={(event) => this.deleteBuyer(event, index)}
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
}
