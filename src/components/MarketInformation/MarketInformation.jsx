import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@material-ui/core/TablePagination';
import { FreeBreakfastRounded } from "@material-ui/icons";

export default class MarketInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderMarkertInfo() {
    const { marketPrices, markets, valueChains, admins } = this.props;
    const marketPriceDetails = [];
    if (marketPrices && marketPrices?.length > 0) {
        
        let marketCountyId = 0;
        let marketCounty = "";
        let marketName = "";
        let valueChain = "";
        let bvName = "";
        let bvFound = false;
      for(let i = 0; i < marketPrices?.length; i++){
          for(let j = 0; j < markets?.length; j++){
              if(marketPrices[i].marketId === markets[j].marketId){
                marketCountyId = markets[j].countyId;
                marketName = markets[j].marketName;
                break;
              }
          }
          for(let j = 0; j < admins?.length; j++){
              if(admins[j].countyId === marketCountyId){
                  marketCounty = admins[j].countyName;
                  break;
              }
          }
          for(let j = 0; j < valueChains.length; j++){
              bvFound = false;
              for(let k = 0; k < valueChains[j].breedVarieties.length; k++){
                  if(valueChains[j].breedVarieties[k].bvId === marketPrices[k].bvId){
                    valueChain = valueChains[j].valueChain;
                    bvName = valueChains[j].breedVarieties[k].bvName
                    bvFound = true;
                    break;
                  }
              }
              if(bvFound)break;
          }

          marketPriceDetails.push({
              marketCounty,
              marketName,
              valueChain,
              bvName,
              retailPrice :marketPrices[i].retailPrice,
              retailPackage: marketPrices[i].retailPackage,
              wholesalePrice: marketPrices[i].wholesalePrice,
              wholesalePackage: marketPrices[i].wholesalePackage,
              suppliedVolumes : marketPrices[i].suppliedVolumes,
              unit: marketPrices[i].unit,
              source: marketPrices[i].source
          });
      }

      
    }

    return(
        <div style={{ height: "100%", width: "100%" }}>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableCell width={10}>County</TableCell>
              <TableCell width={10}>Market</TableCell>
              <TableCell width={10}>Value Chain</TableCell>
              <TableCell width={10}>Variety</TableCell>
              <TableCell width={10}>Retail Price</TableCell>
              <TableCell width={10}>Retail Package</TableCell>
              <TableCell width={10}>Wholesale Price</TableCell>
              <TableCell width={10}>Wholesale Package</TableCell>
              <TableCell width={10}>Supplied Volumes</TableCell>
              <TableCell width={10}>Unit</TableCell>
              <TableCell width={10}>Source</TableCell>
            </TableHead>
            <TableBody>
            {marketPriceDetails?.map((row, index) => (
                  <TableRow key={row.rowIndex}>
                    <TableCell>{row.marketCounty}</TableCell>
                    <TableCell>{row.marketName}</TableCell>
                    <TableCell>{row.valueChain}</TableCell>
                    <TableCell>{row.bvName}</TableCell>
                    <TableCell>{row.retailPrice}</TableCell>
                    <TableCell>{row.retailPackage}</TableCell>
                    <TableCell>{row.wholesalePrice}</TableCell>
                    <TableCell>{row.wholesalePackage}</TableCell>
                    <TableCell>{row.suppliedVolumes}</TableCell>
                    <TableCell>{row.unit}</TableCell>
                    <TableCell>{row.source}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      );
  }

  render() {
    const marketPriceTable = this.renderMarkertInfo();
    return <div>{marketPriceTable}</div>;
  }
}
