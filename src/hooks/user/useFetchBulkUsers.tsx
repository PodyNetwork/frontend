import { useState, useEffect, useCallback } from "react";
import axios from "@/network/axios"; // Adjust the axios import based on your setup
import { BaseResponse } from "@/types/globals";

interface UserBulk {
  id: string;
  username: string;
  walletAddress: string;
}

interface BulkUserResponse extends BaseResponse {
  data: UserBulk[];
}

const useFetchBulkUsers = (usernames: string[]) => {
  const [data, setData] = useState<UserBulk[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBulkUsersByUsernames = useCallback(async () => {
    if (usernames.length === 0) return;

    try {
      setLoading(true);
      const usernamesString = usernames.join(",");
      const response = await axios.get<BulkUserResponse>("user/profile/retrieve/bulk", {
        params: { usernames: usernamesString },
      });
      setData(response.data.data); // Set the fetched data
    } catch (err) {
      setError("Could not fetch users");
      console.error("Error fetching bulk users:", err);
    } finally {
      setLoading(false);
    }
  }, [usernames]); // Include usernames as dependency

  useEffect(() => {
    fetchBulkUsersByUsernames();
  }, [fetchBulkUsersByUsernames]); // Now you can include the function here

  return { data, error, loading };
};

export default useFetchBulkUsers;
