<template>
  <q-page class="q-pa-sm">
    <!-- Título da Página -->
    <h2 class="text-h6">Criar Nova Fatura</h2>

    <!-- Formulário de Criação de Fatura -->
    <q-form @submit="submitInvoice">
      <!-- Campo para o nome da fatura -->
      <q-input outlined v-model="invoiceName" label="Nome da Fatura" />

      <!-- Campos de entrada para o novo item -->
      <div class="new-item q-gutter-sm">
        <q-input outlined v-model="newItemName" label="Nome Item" />
        <q-input outlined v-model="newItemQuantity" label="Quantidade" type="number" />
        <q-input outlined v-model="newItemValue" label="Valor" type="number" />
        <!-- Botão para adicionar mais itens -->
        <q-btn label="Adicionar" @click="addItem" :disabled="!newItemName || !newItemQuantity || !newItemValue" />
      </div>

      <!-- Lista de Itens da Fatura -->
      <div v-for="(item, index) in invoiceItems" :key="index" class="invoice-item q-gutter-md">
        <!-- Nome do item -->
        <div>{{ item.name }}</div>

        <!-- Valor do item -->
        <div>{{ item.value }}</div>

        <!-- Quantidade do item -->
        <div>{{ item.quantity }}</div>

        <!-- Botões de editar e remover -->
        <div class="item-buttons">
          <q-btn label="Editar" @click="editItem(index)" />
          <q-btn label="Remover" @click="removeItem(index)" color="negative" />
        </div>
      </div>

      <!-- Botão de envio do formulário -->
      <q-btn type="submit" label="Criar Fatura" color="primary" class="q-mt-md" />
    </q-form>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      invoiceName: '', // Nome da fatura
      invoiceItems: [], // Itens da fatura
      newItemName: '', // Nome do novo item
      newItemValue: null, // Valor do novo item
      newItemQuantity: null, // Quantidade do novo item
    };
  },
  methods: {
    addItem() {
      if (this.newItemName && this.newItemQuantity && this.newItemValue) {
        this.invoiceItems.push({ name: this.newItemName, value: this.newItemValue, quantity: this.newItemQuantity });
        this.newItemName = '';
        this.newItemValue = null;
        this.newItemQuantity = null;
      }
    },
    editItem(index) {
      // Implemente a lógica para editar o item aqui
    },
    removeItem(index) {
      this.invoiceItems.splice(index, 1);
    },
    submitInvoice() {
      // Lógica para enviar os dados do formulário para o backend e criar a fatura
      const newInvoice = {
        name: this.invoiceName,
        items: this.invoiceItems,
      };
      console.log('Nova Fatura:', newInvoice);
      // Lógica para enviar a nova fatura para o backend
      // Após o sucesso, redirecionar o usuário para a página de visualização de faturas ou exibir uma mensagem de sucesso
    },
  },
};
</script>

<style scoped>
.invoice-item, .new-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.item-buttons {
  display: flex;
  gap: 10px;
}
</style>
