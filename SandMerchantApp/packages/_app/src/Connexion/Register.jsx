import {
  Flex,
  Box,
  Text,
  TextField,
  Button,
  Separator,
} from "@radix-ui/themes";

export default function RegisterForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      lastName: formData.get("lastName"),
      firstName: formData.get("firstName"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    console.log("SUBMIT DATA =>", data);
    if (onSubmit) onSubmit(data);
  };

  return (
    <Flex
      align="center"
      justify="center"
      style={{ height: "80vh", width: "100%" }}
    >
      <Box
        style={{
          width: 280,
          border: "2px solid #FFE149",
          backgroundColor: "#001936",
          borderRadius: 10,
          padding: 24,
        }}
      >
        <Text
          as="h2"
          size="8"
          weight="bold"
          style={{
            color: "#FFE149",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Inscription
        </Text>
        <Separator size="2" style={{ margin: "12px 0 16px" }} />

        {/* ✅ vrai form HTML */}
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <Box>
              <Text
                size="2"
                weight="medium"
                style={{
                  color: "#ffffffff",
                }}
              >
                Prénom
              </Text>
              <TextField.Root
                name="firstName"
                style={{
                  backgroundColor: "#001936",
                  color: "#FFE149",
                  border: "1px solid #FFE149",
                }}
              />
            </Box>

            <Box>
              <Text
                size="2"
                weight="medium"
                style={{
                  color: "#ffffffff",
                }}
              >
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
              <Text
                size="2"
                weight="medium"
                style={{
                  color: "#ffffffff",
                }}
              >
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

            <Box>
              <Text
                size="2"
                weight="medium"
                style={{
                  color: "#ffffffff",
                }}
              >
                Confirmer le mot de passe
              </Text>
              <TextField.Root
                name="confirmPassword"
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
              S’inscrire
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
}
