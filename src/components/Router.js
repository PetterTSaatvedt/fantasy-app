import { Route, Routes } from 'react-router-dom';
import LiveRank from './LiveRank';

function Router(props) {
    return (
        <Routes>
            <Route path='/' Component={LiveRank}></Route>
        </Routes>
    )
}

export default Router;