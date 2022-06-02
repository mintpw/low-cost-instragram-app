import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppLayoutRoute from './components/layout/AppLayout';
import HomePage from './pages';
import CommentsPage from './pages/comments';
import PostImagesPgae from './pages/post-images';

function router() {
  return (
    <BrowserRouter>
      <Switch>
        <AppLayoutRoute exact path="/" component={HomePage} />
        <Route path="/comments" component={CommentsPage} />
        <Route path="/post-images" component={PostImagesPgae} />
      </Switch>
    </BrowserRouter>
  );
}

export default router;
