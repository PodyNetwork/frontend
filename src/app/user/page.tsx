"use client";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface DecodedToken {
  user_id: number;
  eth_address: string;
  edu_username: string;
  iss: string;
  iat: number;
  exp: number;
  aud: string;
  [key: string]: any;
}

const UserPage = () => {
  const { authState, ocAuth } = useOCAuth();
  const router = useRouter();

  if (authState.error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 p-4 rounded-md shadow-md">
          <p className="text-red-600">Error: {authState.error.message}</p>
        </div>
      </div>
    );
  } else {
    let userInfo: DecodedToken | null = null;

    if (authState.idToken) {
      userInfo = jwtDecode<DecodedToken>(authState.idToken);
    }

    return (
      <div className="min-h-screen flex flex-col">
        {userInfo ? (
          <>
            <p className="mb-6 text-gray-600 font-bold text-xl">
              Here are your OCID details:
            </p>
          </>
        ) : (
          <div>
            <p className="mb-6 text-gray-600">
              Please link with open campus to view your details.
            </p>
          </div>
        )}
        {authState.isAuthenticated && (
          <p className="w break-words">You are logged in! {JSON.stringify(ocAuth.getAuthState())}</p>
        )}
        <div>
          <p>
            <strong>User ID:</strong> {userInfo?.user_id}
          </p>
          <p>
            <strong>Ethereum Address:</strong> {userInfo?.eth_address}
          </p>
          <p>
            <strong>Username:</strong> {userInfo?.edu_username}
          </p>
          <p>
            <strong>Issuer:</strong> {userInfo?.iss}
          </p>
          <p>
            <strong>Issued At:</strong>{" "}
            {new Date((userInfo?.iat ?? 0) * 1000).toLocaleString()}
          </p>
          <p>
            <strong>Expiration:</strong>{" "}
            {new Date((userInfo?.exp ?? 0) * 1000).toLocaleString()}
          </p>
          <p>
            <strong>Audience:</strong> {userInfo?.aud}
          </p>
        </div>
      </div>
    );
  }
};

export default UserPage;
