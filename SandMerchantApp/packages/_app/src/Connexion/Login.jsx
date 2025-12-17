import {
  Flex,
  Box,
  Text,
  TextField,
  Button,
  Separator,
} from "@radix-ui/themes";

export default function LoginForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log("LOGIN SUBMIT =>", data);
    if (onSubmit) onSubmit(data);
  };

  return (
    <Box
      style={{
        width: 280,
        border: "2px solid #FFE149",
        backgroundColor: "#001936",
        borderRadius: 10,
        padding: 24,
        color: "#FFFFFF",
      }}
    >
      <Text
        as="h2"
        size="6"
        weight="bold"
        style={{
          color: "#FFE149",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Connexion
      </Text>

      <Separator
        size="2"
        style={{
          margin: "12px 0 16px",
        }}
      />

      {/* vrai form HTML */}
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="3">
          <Box>
            <Text size="2" weight="medium">
              Adresse mail
            </Text>
            <TextField.Root
              name="email"
              type="email"
              style={{
                backgroundColor: "#001936",
                color: "#FFE149",
                border: "1px solid #FFE149",
              }}
            />
          </Box>

          <Box>
            <Text size="2" weight="medium">
              Mot de passe
            </Text>
            <TextField.Root
              name="password"
              type="password"
              style={{
                backgroundColor: "#001936",
                color: "#FFE149",
                border: "1px solid #FFE149",
              }}
            />
          </Box>

          <Button
            type="submit"
            style={{
              marginTop: 12,
              cursor: "pointer",
              backgroundColor: "#FFE149",
              color: "#001936",
              borderRadius: "5px",
            }}
          >
            Se connecter
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
