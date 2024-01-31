<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Barra de navegação superior -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-center">Faturas Móveis</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Conteúdo da página -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Barra de navegação inferior -->
    <q-footer elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          flat
          dense
        >
          <q-icon :name="link.icon" class="q-mr-xs" /> {{ link.label }}
        </q-btn>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>

export default {
  components: {
    
  },
  data() {
    return {
      // Defina os links de navegação inferior
      navLinks: [
        { path: '/', label: 'Home', icon: 'eva-home-outline' },
        { path: '/invoices', label: 'Faturas', icon: 'eva-clipboard-outline' },
        { path: '/receipts', label: 'Recibos', icon: 'eva-file-text-outline' },
        { path: '/quotes', label: 'Cotações', icon: 'eva-pricetags-outline' },
        // Adicione mais links conforme necessário
      ],
    };
  },
};
</script>

<style scoped>
/* Adicione estilos personalizados conforme necessário */

/* Estilo para a barra de navegação superior e inferior */
.bg-primary {
  background-color: #607D8B; /* Cor primária do material design - azul cinza */
}

.text-white {
  color: #ffffff; /* Texto branco */
}

/* Ícone na barra de navegação inferior */
.q-icon {
  color: #ffffff; /* Cor branca para os ícones */
}

.q-footer .q-btn {
  font-size: 13.5px; /* Tamanho da fonte desejado */
}
</style>


