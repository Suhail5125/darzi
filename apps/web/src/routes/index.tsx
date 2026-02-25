import { Route, Switch } from 'wouter';
import { HomePage } from '../pages/HomePage';
import { ProfilePage } from '../pages/ProfilePage';

export const Routes = () => (
  <Switch>
    <Route path="/" component={HomePage} />
    <Route path="/profile" component={ProfilePage} />
  </Switch>
);
