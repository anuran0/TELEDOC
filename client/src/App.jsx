import NavbarComponent from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Symptoms from '../components/Symptoms';
import Form from '../components/Forms';

const App = () => {
  return (
    <div>
      <NavbarComponent />
      <Symptoms />
      <Form />
    </div>
  );
};

export default App;
