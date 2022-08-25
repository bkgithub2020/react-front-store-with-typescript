import Header from "./components/common/Header";
import UserList from "./components/user/UserList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";

function App() {
  return (
    <div id="app" className="container">
      <Header />
      <UserList />
    </div>
  );
}

export default App;
