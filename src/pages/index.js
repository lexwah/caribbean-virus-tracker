import React, { Fragment } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { graphql } from 'gatsby';

const TableRow = ({node, lastupdated}) => {
    if(lastupdated === true){
        return (
        <Fragment>
            <tr>
            <td>{node.location}</td>
            <td>{node.date}</td>
            <td class="text-center">{node.total_cases}</td>
            <td class="text-center">{node.new_cases}</td>
            <td class="text-center">{node.total_deaths}</td>
            <td class="text-center">{node.new_deaths}</td>
            <td><a href={node.source_url} target="_blank" rel="noopener noreferrer">{node.source_name}</a></td>
            </tr>
        </Fragment>       
        );  
    }
    return (
        <Fragment>
            <tr>
            <td colspan="7" style={{display: "none"}}>
                <a href={node.source_url} target="_blank" rel="noopener noreferrer">{node.source_name} ({node.date})</a>
            </td>
            </tr>
        </Fragment>
    );
}

const HomePage = ({data}) => {
    function total_cases() {
        let update_date = data.max_date.nodes[0].comparestring;
        let count = 0;
        data.all_data.nodes.forEach(node =>{
            if(node.date === update_date) {
                count=count+node.total_cases;
            }
        });
        return count;
    }

    function total_new_cases() {
        let update_date = data.max_date.nodes[0].comparestring;
        let count = 0;
        data.all_data.nodes.forEach(node =>{
            if(node.date === update_date) {
                count=count+node.new_cases;
            }
        });
        return count;
    }
    
    function total_deaths() {
        let update_date = data.max_date.nodes[0].comparestring;
        let count = 0;
        data.all_data.nodes.forEach(node =>{
            if(node.date === update_date) {
                count=count+node.total_deaths;
            }
        });
        return count;
    }

    function total_new_deaths() {
        let update_date = data.max_date.nodes[0].comparestring;
        let count = 0;
        data.all_data.nodes.forEach(node =>{
            if(node.date === update_date) {
                count=count+node.new_deaths;
            }
        });
        return count;
    }

    return (
        <Fragment>
            <Header />
                <main>
                    <div class="container py-2">
                        <div class="row">
                            <div class="col-md-12">
                                <h1 class="header">Welcome to Caribbean Virus Tracker</h1>
                                <h5><em>These are the latest reported statistics by the World Health Organization (WHO) for Coronavirus outbreak in the Caribbean.</em></h5>
                                <p>Last Updated on <em>{data.max_date.nodes[0].updatedate}</em></p>
                            </div>
                        </div>
                    </div>
                    <div class="container py-2">
                        <div class="row">
                            <div class="col-md-12">
                            <h2 class="header">Caribbean Outbreak Statistics</h2>
                            <p><strong>Note: </strong>Some Caribbean countries may not be on the list because no Coronavirus infections were reported by that country to WHO <em>(see Disclaimer)</em>. French, Dutch and U.S. Caribbean Territories are not included at the moment.</p> 
                            <br></br>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="card">
                                    <div class="card-header text-center">
                                        <h1><strong>{total_cases()}</strong></h1>
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title text-center">Total Cases</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card">
                                    <div class="card-header text-center">
                                        <h1><strong>{total_new_cases()}</strong></h1>
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title text-center">New Cases</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card">
                                    <div class="card-header text-center">
                                        <h1><strong>{total_deaths()}</strong></h1>
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title text-center">Total Deaths</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card">
                                    <div class="card-header text-center">
                                        <h1><strong>{total_new_deaths()}</strong></h1>
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title text-center">New Deaths</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div class="container py-2">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="table-responsive-md pb-3">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">Location</th>
                                            <th scope="col">Reporting Date</th>
                                            <th scope="col">Total Cases</th>
                                            <th scope="col">New Cases</th>
                                            <th scope="col">Total Deaths</th>
                                            <th scope="col">New Deaths</th>
                                            <th scope="col">Source</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {data.all_data.nodes.map((node) => (
                                            <TableRow node={node} lastupdated={node.date === data.max_date.nodes[0].comparestring}></TableRow>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            <Footer />
        </Fragment>
    );
}

export const query = graphql`
query HomePageQuery {
  all_data: allCaribbeandataCsv(filter: {location: {ne: "World"}}, sort: {fields: [location, date], order: [ASC, DESC]}) {
    nodes {
      location
      date(formatString: "DD MMM YYYY")
      total_cases
      new_cases
      total_deaths
      new_deaths
      source_name
      source_url
    }
  }
  max_date: allCaribbeandataCsv(limit: 1, sort: {fields: date, order: DESC}) {
    nodes {
      updatedate: date(formatString: "MMMM DD, YYYY")
      comparestring: date(formatString: "DD MMM YYYY")
    }
  }
}
`

export default HomePage;