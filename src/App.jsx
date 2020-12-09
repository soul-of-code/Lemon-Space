import React from 'react';
import { BackTop } from 'antd'
import { Helmet } from 'react-helmet'
import './publicCSS/allTheme.css'
import 'moment/locale/zh-cn';
import Lheader from './Component/Lheader';
import home from './Blog/route/home'
import search from './Blog/route/search'
import blogTag from './Blog/route/blogtag'
import blogAssign from './Blog/blogassign'
import FriendLink from './FriendLink'
import Interact from './Interact'
import Life from './Life'
import About from './About'
import Lfooter from './Component/Lfooter'
import Cat from './Component/lemon-cat'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

/**
 * 枢纽
 */
function App() {
  return (
    <Router>
      <Helmet>
        <meta charSet='utf-8' />
      </Helmet>
      <Lheader />
      <div style={{ "width": "100%", "height": "76px" }}></div>
      <div className="wrap">
        <Switch>
          <Route path="/" exact component={home}></Route>
          <Route path='/interact' component={Interact}></Route>
          <Route path='/life' component={Life}></Route>
          <Route path='/friendLink' component={FriendLink}></Route>
          <Route path='/about' component={About}></Route>
          <Route path='/blog/:tag' component={blogTag}></Route>
          <Route path='/search/:str' component={search}></Route>
          <Route path='/blogassign/:art' component={blogAssign}></Route>
        </Switch>
      </div>
      <Lfooter />
      <BackTop />
      <Cat />
    </Router>
  )
}


export default App;
