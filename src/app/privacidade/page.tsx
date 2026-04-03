"use client";

export default function PrivacidadePage() {
  return (
    <div className="min-h-dvh px-5 py-12 max-w-2xl mx-auto">
      <div className="glass-card rounded-3xl p-6">
        <h1 className="font-serif text-2xl font-bold text-slate-800 mb-6">
          Política de Privacidade
        </h1>

        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            <strong>Última atualização:</strong> 3 de abril de 2026
          </p>

          <p>
            O aplicativo <strong>Defenda Sua Fé</strong> (&ldquo;App&rdquo;) é operado pela
            OMNINNECTION (&ldquo;nós&rdquo;, &ldquo;nosso&rdquo;). Esta política descreve como
            tratamos informações ao utilizar nosso App.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-800 pt-2">
            1. Dados que coletamos
          </h2>
          <p>
            <strong>Não coletamos dados pessoais.</strong> O App não exige cadastro,
            login ou qualquer informação pessoal para funcionar. Não coletamos
            nome, e-mail, telefone, localização ou qualquer dado identificável.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-800 pt-2">
            2. Uso de Inteligência Artificial
          </h2>
          <p>
            O recurso &ldquo;Resposta Personalizada&rdquo; utiliza inteligência artificial
            para gerar argumentos sob medida. O texto que você digita na
            descrição da situação é enviado a um serviço de IA terceirizado
            para processar a resposta. <strong>Não armazenamos</strong> essas
            mensagens — elas são processadas em tempo real e descartadas.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-800 pt-2">
            3. Dados de uso
          </h2>
          <p>
            Podemos coletar dados anônimos e agregados sobre o uso do App
            (como número de acessos e páginas visitadas) por meio de serviços
            de analytics. Esses dados não identificam você pessoalmente.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-800 pt-2">
            4. Compartilhamento de dados
          </h2>
          <p>
            Não vendemos, alugamos ou compartilhamos dados pessoais com
            terceiros, pois não coletamos tais dados.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-800 pt-2">
            5. Armazenamento local
          </h2>
          <p>
            O App pode utilizar armazenamento local do navegador (cache e
            service worker) para melhorar a performance e permitir uso
            offline. Esses dados ficam apenas no seu dispositivo.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-800 pt-2">
            6. Compras no aplicativo
          </h2>
          <p>
            Assinaturas são processadas pela Google Play Store. Não temos
            acesso a dados de pagamento como número de cartão. O gerenciamento
            da assinatura é feito diretamente pela sua conta Google.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-800 pt-2">
            7. Segurança
          </h2>
          <p>
            Todas as comunicações entre o App e nossos servidores são
            criptografadas via HTTPS/TLS.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-800 pt-2">
            8. Menores de idade
          </h2>
          <p>
            O App não é direcionado a menores de 13 anos. Não coletamos
            intencionalmente dados de crianças.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-800 pt-2">
            9. Alterações nesta política
          </h2>
          <p>
            Podemos atualizar esta política periodicamente. Alterações serão
            publicadas nesta página com a data de atualização revisada.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-800 pt-2">
            10. LGPD
          </h2>
          <p>
            Este App está em conformidade com a Lei Geral de Proteção de Dados
            (Lei nº 13.709/2018). Como não coletamos dados pessoais
            identificáveis, as obrigações de tratamento de dados não se aplicam.
            Caso isso mude no futuro, atualizaremos esta política e
            solicitaremos seu consentimento quando necessário.
          </p>

          <h2 className="font-serif text-lg font-bold text-slate-800 pt-2">
            11. Contato
          </h2>
          <p>
            Dúvidas sobre esta política? Entre em contato pelo e-mail:{" "}
            <a
              href="mailto:contato@omninnection.com"
              className="text-sunset-600 underline"
            >
              contato@omninnection.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
