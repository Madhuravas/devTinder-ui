import { BrowserRouter, Route, Routes, Navigate  } from "react-router-dom";
import Body from "./Components/Body";
import Login from "./Components/Login";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Profile from "./Components/Profile";
import Feed from "./Components/Feed";

function App() {

  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route element={<Body />} >
            <Route path="/" element={<Navigate to="/feed" replace />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile/>}/>
            <Route path="/feed" element={<Feed/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
