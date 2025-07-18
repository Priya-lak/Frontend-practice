
import './App.css';
import FirstCard from './components/FirstCard/FirstCard';
import SecondCard from './components/SecondCard/SecondCard';
import data from '../data.json';



function App() {
  console.log("data",data);
  
  let total=0;
  let review,description;
  data.map((score)=> total=total+score.score);
  let average= Math.ceil((total/data.length));
  if (average>60){
    review= "Great";
    description = "Loren impiusm"
  }
  else{
    review="Needs Improvement";
    description = "Loren impiusm"
  }
  console.log(average);


  return (
    <main className='main-card'>
      <div className="first-card">
        <FirstCard overallScore={average} review={review} reviewDetails={description}/>
        </div>
        <div className="second-card">
          <SecondCard scores={data}/>
        </div>
    </main>
  )
}

export default App;
