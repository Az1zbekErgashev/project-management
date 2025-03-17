import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import useQueryApiClient from 'utils/useQueryApiClient';

interface Log {
  id: number;
  userId: number;
  action: number;
  text: string;
  date: string;
}

interface User {
  id: number;
  email: string;
}

interface QueryParams {
  PageSize: number;
  PageIndex: number;
  UserId?: number;
  Action?: number;
  StartDate?: string;
  EndDate?: string;
  Text?: string;
}

export default function useLogsApi() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [users, setUsers] = useState<Record<number, User>>({});
  const [queryParams, setQueryParams] = useState<QueryParams>({ PageSize: 10, PageIndex: 1 });

  const authToken = Cookies.get('authToken') || '';

  const actions = [
    { id: 0, name: "Login" },
    { id: 1, name: "Logout" },
    { id: 2, name: "Create Post" },
    { id: 3, name: "Delete Post" },
    { id: 4, name: "Update Profile" },
    { id: 5, name: "Unknown Action" }, // Fallback action
  ];

  // Fetch logs
  const { data: logData, isLoading: isLogsLoading, appendData: fetchLogs } = useQueryApiClient({
    request: {
      url: '/api/logs/filter',
      method: 'GET',
      data: queryParams,
      headers: { Authorization: `Bearer ${authToken}` },
      disableOnMount: true,
    },
  });

  // Fetch users
  const { data: usersData, isLoading: isUsersLoading } = useQueryApiClient({
    request: {
      url: '/api/user/user-email',
      method: 'GET',
      headers: { Authorization: `Bearer ${authToken}` },
    },
  });

  useEffect(() => {
    if (usersData?.data?.length) {
      const userMap = usersData.data.reduce((acc: Record<number, User>, user: User) => {
        acc[user.id] = user;
        return acc;
      }, {});
      setUsers(userMap);
    }
  }, [usersData]);

  useEffect(() => {
    fetchLogs(queryParams);
  }, [queryParams]);

  useEffect(() => {
    if (logData?.data?.items) {
      console.log("API Response:", logData.data.items);

      const updatedLogs = logData.data.items.map((log: Log) => ({
        ...log,
        userEmail: users[log.userId]?.email || "Unknown User",
        actionName: actions.find((a) => a.id === log.action)?.name || `Unknown (${log.action})`,
        text: log.text || "No details provided",
      }));
      setLogs(updatedLogs);
    }
  }, [logData, users]);

  return { logs, users, queryParams, setQueryParams, isLogsLoading, isUsersLoading };
}
