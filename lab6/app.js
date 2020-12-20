let studentsData = [];

function avgAllF() {return (Object.keys(studentsData).reduce( function( sum, key ){
          return sum + parseFloat( studentsData[key]["avg"] );
        }, 0 )/studentsData.length).toFixed(2);
      };

function sumF() {return Object.keys(studentsData).reduce( function( sum, key ){
                return sum + parseFloat( studentsData[key]["avg"] );
              }, 0 );
            };

class StudentsTable extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                              students: [],
                              sum: 0
                          };
            this.addNew = this.addNew.bind(this);
            this.newName = this.newName.bind(this);
            this.newSurname = this.newSurname.bind(this);
            this.newAge = this.newAge.bind(this);
            this.newAvg = this.newAvg.bind(this);
            this.deleteRow = this.deleteRow.bind(this);
              this.editRow = this.editRow.bind(this);
                this.showSum=  this.showSum.bind(this);
                    }

    componentDidMount() {
          fetch("http://localhost:8000/students.json")
                .then(res => res.json())
                .then(
                	(result) => {
                    studentsData = result;
                     this.setState({
                     students: studentsData,
                     sum: avgAllF()
                 });
                 });
            
        // studentsData = [
        //                   	{
        //                   		"name": "COVID",
        //                   		"surname": "19",
        //                   		"age": 1,
        //                   		"avg": -3
        //                   	},
        //                   	{
        //                   		"name": "Barhatnie",
        //                   		"surname": "Ruchki",
        //                   		"age": 0,
        //                   		"avg": 10
        //                   	},
        //                   	{
        //                   		"name": "Mladshiy",
        //                   		"surname": "Leytenant",
        //                   		"age": 21,
        //                   		"avg": 7
        //                   	}
        //                   ];
	}

    addNew(event) {
       event.preventDefault()
       let temp = {
           "name": this.state.name,
           "surname": this.state.surname,
           "age": (isNaN(this.state.age) ? -3 : +(this.state.age)),
           "avg": (isNaN(this.state.avg) ? 0 : +(this.state.avg))
       };

       studentsData.push(temp);
       console.log(studentsData);

       this.setState({
         students: studentsData,
         sum: avgAllF()
       });

    }

    newName(event)
    {
      let temp = event.target.value;
       this.setState({name: temp, surname: this.state.surname, age: this.state.age, avg:  this.state.avg});
    }

    newSurname(event)
    {
      let temp = event.target.value;
       this.setState({name:this.state.name , surname: temp, age: this.state.age, avg:  this.state.avg});
    }

    newAge(event)
    {
      let temp = event.target.value;
       this.setState({name:this.state.name , surname: this.state.surname, age: temp, avg:  this.state.avg});
    }
    newAvg(event)
    {
      let temp = event.target.value;
       this.setState({name:this.state.name , surname: this.state.surname, age: this.state.age, avg:  temp});
    }

    deleteRow = (i)=> {
      let array = [...this.state.students];
      let index = array.indexOf(i);
      studentsData.splice(index, 1);
      console.log(studentsData);
    this.setState({
      students: studentsData,
      sum: avgAllF()
    });
  };

  editRow = (i)=> {
    let newAvgMark = prompt('Enter new mark');
    if (newAvgMark === null) {
        return;
    };
    newAvgMark = +newAvgMark;
    let array = [...this.state.students];
    let index = array.indexOf(i);
    studentsData[index]['avg'] = newAvgMark;
  this.setState({
    students: studentsData,
    sum: avgAllF()
  });
};
  showSum = ()=> alert("Cумма есть: "+sumF()+". Брать будем?");

    render() {
                   return (
                     <div>
                            <form onSubmit={this.addNew}>
                               <p>
                                   Имя:
                                   <input type="text" value={this.state.name}  onChange={this.newName}/>
                               </p>
                               <p>
                                   Фамилия:
                                   <input type="text" value={this.state.surname}  onChange={this.newSurname}/>
                               </p>
                               <p>
                                   Возраст:
                                   <input type="number" value={this.state.age}  onChange={this.newAge}/>
                               </p>
                               <p>
                                   Балл:
                                   <input type="number" value={this.state.avg}  onChange={this.newAvg}/>
                               </p>
                               <button> Эдд</button>
                            </form>
                            <button  onClick={i => this.showSum()}> Че каво сумма есть?</button>
                            <table>
                               <tr>
                                   <th>Имя</th>
                                   <th>Фамилия</th>
                                   <th>Возраст</th>
                                   <th>Средний балл</th>
                               </tr>
                               {this.state.students.map((student,i) => (
                               <tr key={i}>
                                   <td>{student.name}</td>
                                   <td>{student.surname}</td>
                                   <td>{student.age}</td>
                                   <td>{student.avg}</td>
                                   <td> <button  onClick={i => this.deleteRow(student)} > Делит студент</button></td>
                                    <td> <button  onClick={i => this.editRow(student)} > Эдит студент</button></td>
                               </tr>
                               ))}
                           </table>
                           <p>Так, тут у нас среднее по баллам, вообщем ситуация складывается такая, смотрите сюда: {this.state.sum}</p>
                        </div>
                   );
               }
 }

  ReactDOM.render(
                <StudentsTable />,
                document.getElementById("app")
            )
