import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';
import faker from "@faker-js/faker"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {  Table } from 'antd';
import {CanvasJSChart} from 'canvasjs-react-charts'
import './App.css'

ChartJS.register(ArcElement, Tooltip, Legend);

  function App () {

   const [usersData, setUsersData] = useState([])
   const [locationData, setLocationData] = useState([])
   const [indexActive, setIndexActive] = useState({
    key: "1",
    value:"",
   });
   const [carPagination, setCarPagination] = useState([])
   const [newFilter, setNewFilter] = useState([])
   const [test, setTest] = useState("")
   const [carAge, setCarAge] = useState("")
   const [virtualized, setVirtualized] = useState("")
   const [lastPie, setLastPie] = useState("")
   const [copyLastPie, setCopyLastPie] = useState("")
   const [display, setDisplay] = useState(false)
  
   useEffect(() => {

    // faker Data Fectching
    let data =[]
    for (let id=1; id <= 100; id++) {

      let firstName = faker.name.firstName();
      let address = faker.address.country();
      let phone = faker.phone.phoneNumber();
      let manufacturer =faker.vehicle.manufacturer() ;
      let jobTitle = faker.name.jobTitle()
      let model = faker.vehicle.model()
  
      const min = 35;
      const max = 75;
      const rand = min + Math.random() * (max - min);
      let age = Math.round(rand)
  
      const min1 = 5;
      const max1 = 30;
      const rand1 = min1 + Math.random() * (max1 - min1);
      let carAge = Math.round(rand1)
  
  
      data.push({
          "id": id,
          "first_name": firstName,
          "address" : address,
          "phone" : phone,
          "cars" : manufacturer,
          "model" : model,
          "jobTitle" : jobTitle,
          "age" : age,
          "carAge": carAge,
      });
    }
    setUsersData(data)


  // BarChart
    var occurences = data.reduce(function (r, row) {
      r[row.address] = ++r[row.address] || 1;
      return r;
  }, {});
  
  var result = Object.keys(occurences).map(function (key) {
      return { key: key, value: occurences[key] };
  });
    setLocationData(result)
   


    // Pie Chart For car models on the basis of their Car Maker

    var occurences =  data.reduce(function (r, row) {
      r[row.model] = ++r[row.model] || 1;
      return r;
  }, {});
  // console.log("occurences", occurences)
  
  var pieResult = Object.keys(occurences).map(function (key) {
      return { label: key, y: occurences[key] };
  });
  // console.log("pieResult", pieResult)
setTest(pieResult)


   


// Pagination
var page =  data.reduce(function (r, row) {
  r[row.cars] = ++r[row.cars] || 1;
  return r;
}, {});

let pagination = Object.keys(page).map(function (key) {
  return { key: key, value: page[key] };
});
setCarPagination(pagination)




// Pie Chart CarAge
let occurences1 =  data.reduce(function (r, row) {
  r[row.carAge] = ++r[row.carAge] || 1;
  return r;
}, {});

let pieAge = Object.keys(occurences1).map(function (key) {
  return { label: key, y: occurences1[key] };
});

setCarAge(pieAge)



// Seperating CarsModel and Age from arrary
const newObject = {};

let results = data.map(a => a.cars );
let result1 = data.map(a => a.carAge );
console.log("results1", result1)
results.forEach((element, index) => {
  newObject[element] = result1[index];
});


let pagination1 = Object.keys(newObject).map(function (key) {
  return { label: key, y: newObject[key] };
});
setLastPie(pagination1)
setCopyLastPie(pagination1)


  }, [])

  const handleClick = (usersData, index) => {
    setIndexActive( {key:index, value:usersData})
  };
 
  const Virtual = (event, param) =>{
    setDisplay(true)
  const filtered = usersData.filter(itemInArray => 
  itemInArray.first_name == param.name
);
setVirtualized(filtered)
  }

  
// userInfo by carsModel
  const UserInfo = (event, param) =>{
    setDisplay(true)
    const filterLeave = usersData.filter(itemInArray => 
      itemInArray.cars == param.key
    );
    setNewFilter(filterLeave)
  } 


  // Display Virtualized list of users with their User Name and Age
  const columns = [
    {
      title: 'Name',
      dataIndex: 'first_name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Car',
      dataIndex: 'cars',
    },
    {
      title: 'Job',
      dataIndex: 'jobTitle',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
  ];

  // A paginated list of cars without duplicates
  const columns1 = [
    {
      title: 'Name',
      dataIndex: 'first_name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Car Age',
      dataIndex: 'carAge',
    },
    {
      title: 'Car Model',
      dataIndex: 'model',
    },
  ];
// console.log("virtualized", virtualized)

    // Pie Chart For car models on the basis of their Car Maker
    const options = {
      theme: "dark",
      animationEnabled: true,
      exportFileName: "New Year Resolutions",
      exportEnabled: true,
      title:{
        text: ""
      },
      data: [{
        type: "pie",
        showInLegend: true,
        legendText: "{label}",
        toolTipContent: "{label}: <strong>{y}</strong>",
        indexLabel: "{y}",
        indexLabelPlacement: "inside",
        dataPoints: test
      }]
    }

    // Pie chart for their car’s Model and age
    const options2 = {
      theme: "dark",
      animationEnabled: true,
      exportFileName: "New Year Resolutions",
      exportEnabled: true,
      title:{
        text: ""
      },
      data: [{
        type: "pie",
        showInLegend: true,
        legendText: "{label}",
        toolTipContent: "{label}: <strong>{y}</strong>",
        indexLabel: "{y}",
        indexLabelPlacement: "inside",
        dataPoints: carAge
      }]
    }

   

    // Pie chart for their car’s age.

    const options1 = {
      theme: "dark",
      animationEnabled: true,
      exportFileName: "New Year Resolutions",
      exportEnabled: true,
      title:{
        text: ""
      },
      data: [{
        type: "pie",
        showInLegend: true,
        legendText: "{label}",
        toolTipContent: "{label}: <strong>{y}</strong>",
        indexLabel: "{y}",
        indexLabelPlacement: "inside",
        dataPoints: lastPie
      }]
    }
 


    // Drop down Filter by Age in Pie chage
    const DataChange = (e, type) =>{
     console.log("type", e.target.value)
     if(e.target.value == "one"){
      const filtered = copyLastPie.filter(itemInArray => {
        return itemInArray.y >= 10 &&  itemInArray.y <= 15;
      })
      setLastPie(filtered)
     }
     else if(e.target.value == "two"){
      const filtered = copyLastPie.filter(itemInArray => {
        return itemInArray.y >= 16 &&  itemInArray.y <= 20;
      })
      setLastPie(filtered)
     }
     else if(e.target.value == "three"){
      const filtered = copyLastPie.filter(itemInArray => {
        return itemInArray.y >= 21 &&  itemInArray.y <= 25;
      })
      setLastPie(filtered)
     }
     else if(e.target.value == "four"){
      const filtered = copyLastPie.filter(itemInArray => {
        return itemInArray.y >= 26 &&  itemInArray.y <= 30;
      })
      setLastPie(filtered)
    }
     
    }


    
    return (
      <div className='App'>
          <div style={{ width: '100%' }}>
            <h1>Bar chart according to which country users belong.</h1>
            <h3>Click each Bars </h3>
          <div className='bar-chart'>
            <ResponsiveContainer width="70%" height={300}>
          <BarChart width={150} height={40} data={locationData}>
            {locationData.length>0 && <Bar dataKey="value" onClick={handleClick}>
              {usersData.map((entry, index) => (
                <Cell cursor="pointer" fill={index === indexActive ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
              ))}
            </Bar>}
          </BarChart>
            </ResponsiveContainer>
          </div>

          {indexActive?.value?.key ? 
          <p className="content">{`No of Users : ${indexActive?.value?.value} Country : ${indexActive?.value?.key}`}</p> : "" }
          <hr/>
        <div className='CarPie-chart'>
          <h1>Pie chart for their car models on the basis of their Car Maker (CarsModel : no of cars)</h1>
            <CanvasJSChart options = {options} />
        </div>
          <hr />


      <div className='CarPie-chart'>
        <h1>Pie chart for their car's age.(Age of Cars : no of Cars) </h1>
          <CanvasJSChart options = {options2} />
      </div>
      <hr />

      <div className='CarPie-chart'>
        <div className='nameDropDown'>
          <h1>Pie chart for their car's age. </h1>
          <select onClick={(e)=> DataChange(e)}>
            <option>Select</option>
            <option value={"one"}>Cars Age : 10-15</option>
            <option value={"two"}>Cars Age : 15-20</option>
            <option value={"three"}>Cars Age : 20-25</option>
            <option value={"four"}>Cars Age : 25-30</option>
          </select>
        </div>
          <CanvasJSChart options = {options1} />
      </div>


      <div className='virtual'>
        <div className='filterData'>
          <div className='nameId'>
            <span > Name</span>
            <span >Age</span>
          </div>
          <hr />
        {usersData && usersData.map((item, index)=>{
          let name = item.first_name
            return(
            <div key={index}>
              <a  onClick={event => Virtual(event, {name})}> {item.first_name}</a>
              <a id='filterAge'> {item.age}</a><br/>
            </div>
            );
        })}
      </div>

      {display ? 
        <div className='displayData'>
          <Table columns={columns}   dataSource={virtualized}/>
        </div> : "CLick on the Name" }
      </div>
      <hr />

      
      <div className='virtual'>
        <div className='filterData1'>
          <span >Car Model</span>
          <hr/>
          {carPagination && carPagination.map((item, index)=>{
          let key = item.key
          return(
            <ul key={index}>
              <a onClick={event => UserInfo(event, {key})}>{item.key}</a><br/>
            </ul>
          );
        })}
      </div>
         
      {display? 
        <div className='displayData'>
          <Table columns={columns1} dataSource={newFilter} />
        </div>
        : "Click on the Car"}

      </div>
      </div>
      </div>
    );
  }
export default App;