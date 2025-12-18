import { Flex } from "@radix-ui/themes";
import { navigate } from "raviger";

export function HeaderBar() {
  return (
    <Flex
      style={{
        width: "100% ",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#001936e1",
        padding: "8px",
        borderRadius: "8px",
        borderBottom: "2px solid #FFE149",
      }}
    >
      <img
        src="/Menu_burger.png"
        alt="all the chapters"
        style={{
          height: "48px",
          width: "54px",
        }}
        onClick={() => navigate("/chapters")}
      />
      <img
        src="/Accueil_logo.png"
        alt="log acceuil"
        style={{
          height: "42px",
          width: "41px",
        }}
        onClick={() => navigate("/home")}
      />
      <img
        src="/scan.png"
        alt="scan 3d"
        style={{
          height: "41px",
          width: "41px",
        }}
      />
    </Flex>
  );
}
