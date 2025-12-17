import { useState } from "react";
import { useNavigate } from "raviger";
import { Flex, Box, Button } from "@radix-ui/themes";

import LoginForm from "./Login";
import RegisterForm from "./Register";
import { login } from "../../../base/login";
import { register } from "../../../base/register";

export default function Connexion() {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const navigate = useNavigate();

  // LOGIN
  const handleLogin = async ({ email, password }) => {
    const { error } = await login(email, password);

    if (error) {
      console.error("Erreur login:", error.message);
      return;
    }

    navigate("/FirstConnexion");
  };

  // REGISTER
  const handleRegister = async (formData) => {
    const { email, password, confirmPassword, firstName } = formData;

    if (password !== confirmPassword) {
      console.error("Les mots de passe ne correspondent pas");
      return;
    }

    const { error } = await register(email, password, firstName);

    if (error) {
      console.error("Erreur Supabase:", error.message);
      return;
    }

    navigate("/FirstConnexion");
  };

  return (
    <Flex
      align="center"
      justify="center"
      style={{ height: "100vh", width: "100%" }}
    >
      <Box
        style={{
          borderRadius: 24,
          padding: 24,
        }}
      >
        {/* 🔘 TOGGLE BUTTONS */}
        <Flex gap="2" mb="4">
          <Button
            onClick={() => setMode("login")}
            style={{
              flex: 1,
              backgroundColor: mode === "login" ? "#fff200ff" : "#af8900ff",
              color: "#001936",
              cursor: "pointer",
            }}
          >
            Connexion
          </Button>

          <Button
            onClick={() => setMode("register")}
            style={{
              flex: 1,
              backgroundColor: mode === "register" ? "#fff200ff" : "#af8900ff",
              color: "#001936",
              cursor: "pointer",
            }}
          >
            Inscription
          </Button>
        </Flex>

        {/* 🧩 FORM */}
        {mode === "login" ? (
          <LoginForm onSubmit={handleLogin} />
        ) : (
          <RegisterForm onSubmit={handleRegister} />
        )}
      </Box>
    </Flex>
  );
}
