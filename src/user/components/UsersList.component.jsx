import UserItem from './UserItem.component';
import Card from '../../shared/components/UIElements/Card.component';

import './UsersList.styles.css';

const UsersList = (props) => {
  if (props.users.length === 0 || props.error) {
    return (
      <div className="center">
        <Card>
          <h2>Aucun utilisateur trouve</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.users.map((user) => {
        return <UserItem key={user.id} user={user} />;
      })}
    </ul>
  );
};

export default UsersList;
