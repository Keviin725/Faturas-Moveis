<template>
  <q-page class="q-pa-sm">
    <!-- Título da Página -->
    <h2 class="text-h6">Criar Nova Fatura</h2>

    <!-- Formulário de Criação de Fatura -->
    <q-form @submit="submitInvoice">

      <div class="new-item q-gutter-sm">
        <q-input outlined v-model="invoiceName" label="Nome da Fatura" dense>
          <template v-slot:prepend>
            <q-icon name="eva-person-outline" />
          </template>
        </q-input>
        <q-input outlined v-model="newItemName" label="Nome do Item" dense>
          <template v-slot:prepend>
            <q-icon name="eva-shopping-bag-outline" />
          </template>
        </q-input>
        <q-input outlined v-model="newItemQuantity" label="Quantidade" type="number" dense>
          <template v-slot:prepend>
            <q-icon name="fa-solid fa-scale-balanced" />
          </template>
        </q-input>
        <q-input outlined v-model="newItemValue" label="Valor (MZN)" type="number" dense>
          <template v-slot:prepend>
            <q-icon name="fa-solid fa-dollar-sign" />
          </template>
        </q-input>
        <!-- Botão para adicionar mais itens -->
        <q-btn label="Adicionar Item" @click="addItem" :disable="!isItemValid" dense>
          <template v-slot:icon>
            <q-icon name="eva-plus-outline" />
          </template>
        </q-btn>
      </div>

      <!-- Lista de Itens da Fatura -->
      <div v-if="invoiceItems.length > 0">
        <h3 class="text-h6">Itens Adicionados</h3>
        <q-card class="invoice-items-card">
          <q-card-section>
            <!-- Cabeçalho da lista de itens -->
            <div class="invoice-item-header row">
              <div class="col-4">Nome</div>
              <div class="col-3">Qtd</div>
              <div class="col-3">Preço</div>
              <div class="col-2">Ações</div>
            </div>
            <!-- Lista de itens -->
            <div class="invoice-item row scrollable-list" v-for="(item, index) in invoiceItems" :key="index">
              <div class="col-4">{{ item.name }}</div>
              <div class="col-3">{{ item.quantity }}</div>
              <div class="col-3">{{ item.value }} MZN</div>
              <div class="col-2">
                <div class="action-buttons">
                  <q-btn flat icon="eva-edit-outline" color="primary" @click="editItem(index)" class="action-btn" dense />
                  <q-btn flat icon="eva-trash-outline" color="negative" @click="removeItem(index)" class="action-btn" dense />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <h3 class="text-h6">Total da Fatura: {{ invoiceTotal }} MZN</h3>
      </div>

      <q-checkbox v-model="isPaid" label="Fatura Paga" />

      <!-- Botão de envio do formulário -->
      <q-btn type="submit" label="Criar Fatura" color="primary" class="q-mt-md" :disable="!isInvoiceValid" dense>
        <template v-slot:icon>
          <q-icon name="eva-checkmark-outline" />
        </template>
      </q-btn>
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
      isPaid: false, // Indica se a fatura foi paga
    };
  },
  computed: {
    isItemValid() {
      return this.newItemName && this.newItemQuantity && this.newItemValue;
    },
    isInvoiceValid() {
      return this.invoiceName && this.invoiceItems.length > 0 && this.isPaid;
    },
    invoiceTotal() {
      return this.invoiceItems.reduce((total, item) => total + item.quantity * item.value, 0);
    },
  },
  methods: {
    addItem() {
      if (this.isItemValid) {
        this.invoiceItems.push({ name: this.newItemName, value: this.newItemValue, quantity: this.newItemQuantity });
        this.clearNewItemFields();
      }
    },
    editItem(index) {
      // Implemente a lógica para editar o item aqui
    },
    removeItem(index) {
      this.invoiceItems.splice(index, 1);
    },
    clearNewItemFields() {
      this.newItemName = '';
      this.newItemValue = null;
      this.newItemQuantity = null;
    },
    submitInvoice() {
      // Lógica para enviar os dados do formulário para o backend e criar a fatura
      const newInvoice = {
        name: this.invoiceName,
        items: this.invoiceItems,
        paid: this.isPaid, // Adicionando o campo 'paid' à fatura
      };
      console.log('Nova Fatura:', newInvoice);
      // Lógica para enviar a nova fatura para o backend
      // Após o sucesso, redirecionar o usuário para a página de visualização de faturas ou exibir uma mensagem de sucesso
    },
  },
};
</script>

<style scoped>
.invoice-items-card {
  margin-top: 20px;
}

.scrollable-list {
  max-height: 300px;
  /* Ajuste este valor conforme necessário */
  overflow-y: auto;
}

.invoice-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.action-btn {
  color: #666;
  transition: all 0.3s ease;
}

.action-btn:hover {
  color: #ff5252;
}

.q-btn {
  margin-top: 20px;
}

.invoice-item-header,
.invoice-item {
  padding: 10px 0;
}

.invoice-item-header {
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
