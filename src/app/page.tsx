"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({ email, senha }),
        headers: { "Content-Type": "application/json" }
      });

      if (res.ok) {
        router.push("/produtos");
      } else {
        const data = await res.json();
        setErro(data.error || "Acesso negado");
      }
    } catch {
      setErro("Falha ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      backgroundColor: "#f4f4f5",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Lado esquerdo — decorativo */}
      <div style={{
        width: "45%",
        backgroundColor: "#18181b",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px 56px",
      }}>
        
        <h1 style={{
          color: "#ffffff",
          fontSize: "28px",
          fontWeight: "600",
          lineHeight: "1.3",
          letterSpacing: "-0.5px",
          marginBottom: "16px",
        }}>
          Sistema de<br />Gestão de Estoque
        </h1>
        <p style={{
          color: "#a1a1aa",
          fontSize: "14px",
          lineHeight: "1.7",
          maxWidth: "280px",
        }}>
          Controle seus produtos, movimentações e alertas de estoque em um só lugar.
        </p>
      </div>

      {/* Lado direito — formulário */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}>
        <div style={{ width: "100%", maxWidth: "340px" }}>
          <h2 style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#18181b",
            marginBottom: "6px",
          }}>
            Entrar
          </h2>
          <p style={{
            fontSize: "14px",
            color: "#71717a",
            marginBottom: "32px",
          }}>
            Informe suas credenciais para continuar
          </p>

          {erro && (
            <div style={{
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              padding: "10px 14px",
              borderRadius: "6px",
              fontSize: "13px",
              marginBottom: "20px",
              border: "1px solid #fecaca",
            }}>
              {erro}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "18px" }}>
              <label style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "500",
                color: "#3f3f46",
                marginBottom: "6px",
              }}>
                E-mail
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  border: "1px solid #d4d4d8",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontFamily: "'Inter', sans-serif",
                  color: "#27272a",
                  backgroundColor: "#fafafa",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "26px" }}>
              <label style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "500",
                color: "#3f3f46",
                marginBottom: "6px",
              }}>
                Senha
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  border: "1px solid #d4d4d8",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontFamily: "'Inter', sans-serif",
                  color: "#27272a",
                  backgroundColor: "#fafafa",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: loading ? "#a1a1aa" : "#18181b",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                fontFamily: "'Inter', sans-serif",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.15s",
              }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}