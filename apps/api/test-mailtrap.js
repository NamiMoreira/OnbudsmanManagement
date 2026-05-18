// test-api-mailtrap.js
require('dotenv').config();

async function testMailtrapAPI() {
  console.log("=== Testando Mailtrap API ===");
  
  // Verifica se o token existe
  const token = process.env.MAILTRAP_API_TOKEN;
  if (!token) {
    console.error("❌ MAILTRAP_API_TOKEN não encontrado no .env");
    return;
  }
  
  console.log(`Token encontrado (${token.length} caracteres)`);
  console.log("Primeiros 10 chars:", token.substring(0, 10) + "...");
  
  try {
    // Importa dinamicamente (ESM)
    const nodemailer = (await import('nodemailer')).default;
    const { MailtrapTransport } = await import('mailtrap');
    
    const transporter = nodemailer.createTransport(
      MailtrapTransport({ token })
    );
    
    console.log("\n🚀 Enviando email de teste via API...");
    
    const result = await transporter.sendMail({
      from: { 
        address: "test@yourdomain.com", 
        name: "Test API" 
      },
      to: "test@example.com", // Altere para um email real
      subject: "Teste API Mailtrap",
      text: "Este é um teste da API Mailtrap!",
      html: "<p>Este é um teste da <b>API Mailtrap</b>!</p>"
    });
    
    console.log("\n✅ SUCESSO!");
    console.log("Resultado:", {
      success: result.success,
      message_ids: result.message_ids,
      url: result.url || "N/A"
    });
    
  } catch (error) {
    console.error("\n❌ ERRO na API:", error.message);
    console.error("Stack:", error.stack);
  }
}

testMailtrapAPI();