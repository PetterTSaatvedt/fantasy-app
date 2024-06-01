import { Route, Routes } from 'react-router-dom';
import LiveRank from './LiveRank';

function Router() {
    return (
        <Routes>
            <Route path='/' Component={LiveRank}></Route>
        </Routes>
    )
}

export default Router;