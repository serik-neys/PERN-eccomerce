import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Context } from ".";
import AppRouter from "./components/AppRouetr";
import NavBar from "./components/NavBar";
import { check } from "./http/userAPI";

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    check().then(() => {

      user.setUser(true)
      user.setIsAuth(true)

    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={"grow"} />
  }

  return (
    <div className="App">
      <NavBar />
      <AppRouter />
    </div>
  );
})

export default App;
