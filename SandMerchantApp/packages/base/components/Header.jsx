import { Flex, Box } from "@radix-ui/themes";

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
        alt="log acceuil"
        style={{
          height: "35px",
          width: "35px",
        }}
      />
      <img
        src="/Accueil_logo.png"
        alt="log acceuil"
        style={{
          height: "35px",
          width: "35px",
        }}
      />
      <img
        src="/scan.png"
        alt="log acceuil"
        style={{
          height: "30px",
          width: "30px",
        }}
      />
    </Flex>
  );
}
