# 🚀 Deploy Rápido - Churrascaria 2 Irmãos

## ⚡ Opção Mais Rápida: Netlify

### **1. Acesse Netlify**
- Vá para: https://netlify.com
- Clique em "Sign up" (pode usar conta do GitHub)

### **2. Faça Upload dos Arquivos**
1. Clique em "New site from Git"
2. Conecte com GitHub (se tiver conta)
3. **OU** clique em "Deploy manually"
4. Arraste toda a pasta do projeto para a área de upload
5. Clique em "Deploy site"

### **3. Seu Site Estará Online!**
- URL: `https://seu-site-123456.netlify.app`
- Pode personalizar o nome depois

---

## 🌟 Opção GitHub Pages

### **1. Crie Conta no GitHub**
- Acesse: https://github.com
- Crie uma conta gratuita

### **2. Crie Repositório**
1. Clique em "New repository"
2. Nome: `churrascaria-2irmaos`
3. Deixe público
4. **NÃO** inicialize com README
5. Clique em "Create repository"

### **3. Envie os Arquivos**
```bash
# No PowerShell (após reiniciar)
git init
git add .
git commit -m "Primeiro commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/churrascaria-2irmaos.git
git push -u origin main
```

### **4. Ative GitHub Pages**
1. Vá em Settings > Pages
2. Source: Deploy from a branch
3. Branch: main
4. Clique em Save

### **5. Seu Site:**
- URL: `https://SEU-USUARIO.github.io/churrascaria-2irmaos`

---

## 🔥 Configurar Firebase (Admin Online)

### **1. Criar Projeto Firebase**
1. Acesse: https://console.firebase.google.com
2. Clique em "Criar projeto"
3. Nome: `churrascaria-2irmaos`
4. Siga os passos do `GUIA-ONLINE.md`

### **2. Atualizar Código**
- Abra `admin-firebase.js`
- Substitua as configurações pelas suas do Firebase

---

## 📱 Testar Localmente

### **Sem Servidor:**
1. Clique duas vezes em `teste-local.html`
2. Teste todos os links
3. Verifique se tudo funciona

### **Com Live Server (VS Code):**
1. Instale extensão "Live Server"
2. Clique direito em `index.html`
3. "Open with Live Server"

---

## ✅ Checklist de Deploy

- [ ] Testar localmente (clique em `teste-local.html`)
- [ ] Escolher plataforma (Netlify ou GitHub Pages)
- [ ] Fazer upload/envio dos arquivos
- [ ] Verificar se o site está online
- [ ] Testar todas as páginas
- [ ] Configurar Firebase (opcional)
- [ ] Testar admin online

---

## 🎯 URLs Finais

Após o deploy, você terá:

- **Site Principal:** `https://seu-site.netlify.app` ou `https://seu-usuario.github.io/churrascaria-2irmaos`
- **Página Principal:** `/index.html`
- **Loja:** `/loja.html`
- **Admin Local:** `/admin.html`
- **Admin Online:** `/admin-firebase.html`

---

## 🔐 Credenciais de Login

- **Usuário:** `2irmaos`
- **Senha:** `val2025`

---

## 📞 Suporte

Se tiver problemas:
1. Verifique se todos os arquivos foram enviados
2. Teste localmente primeiro
3. Verifique console do navegador (F12)
4. Use o arquivo `teste-local.html` para verificar

---

**🎉 Parabéns! Seu site da churrascaria estará online em poucos minutos!** 