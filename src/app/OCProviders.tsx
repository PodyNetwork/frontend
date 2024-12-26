import OCConnectWrapper from "@/components/ocid/OCConnectWrapper";

export default function OCProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const opts = {
    redirectUri: "http://localhost:3000/redirect", // Adjust this URL
    referralCode: "PARTNER6", // Assign partner code
  };

  return (
    <OCConnectWrapper opts={opts} sandboxMode={true}>
      {children}
    </OCConnectWrapper>
  );
}
