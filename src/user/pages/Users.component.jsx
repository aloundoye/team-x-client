import { useEffect, useState } from 'react';

import UsersList from '../components/UsersList.component';
import ErrorModal from '../../shared/components/UIElements/ErrorModal.component';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.component';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await sendRequest('http://localhost:5000/api/users/');
        setLoadedUsers(data.users);
      } catch (err) {}
    };

    fetchUsers();
  }, []);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedUsers && (
        <UsersList users={loadedUsers} error={error} />
      )}
    </>
  );
};

export default Users;
