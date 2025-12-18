import { Flex } from "@radix-ui/themes";
import { Link, navigate } from "raviger";

export function Bed() {
  return (
    <Flex
      style={{
        flexDirection: "column",
        gap: "15px",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1
        style={{
          fontFamily: "serif",
          fontSize: 24,
          letterSpacing: 1.2,
          color: "#fff",
          textTransform: "uppercase",
          marginTop: 6,
          textAlign: "center",
        }}
      >
        Faites de beau rêves à demain !
      </h1>
      <button
        onClick={() => navigate("/")}
        style={{
          fontFamily: "Cinzel",
          fontWeight: 200,
          fontSize: "20px",
          width: "190px",
          height: 50,
          borderRadius: 10,
          backgroundColor: "#E6C14F",
          border: "1px solid #C8A43A",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Fermer
      </button>
      <Link
        href="/home"
        style={{
          textAlign: "center",
          textDecoration: "none",
          fontFamily: "Cinzel",
          fontWeight: 200,
          fontSize: "20px",
          width: "190px",
          height: 50,
          color: "#E6C14F",
        }}
      >
        Retour
      </Link>
    </Flex>
  );
}
