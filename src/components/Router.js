import { Route, Routes } from 'react-router-dom';
import LiveRank from './LiveRank';
import Leagues from './Leagues';

function Router(props) {
    return (
        <Routes>
            <Route path='/' Component={LiveRank}></Route>
            <Route path='/leagues' Component={Leagues}></Route>
        </Routes>
    )
}

export default Router;