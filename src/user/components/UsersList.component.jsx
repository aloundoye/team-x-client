import './UsersList.styles.css';

import UserItem from './UserItem.component';

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>Aucun utilisateur trouve</h2>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((user) => {
        return <UserItem key={user.id} user={user} />;
      })}
    </ul>
  );
};

export default UsersList;
