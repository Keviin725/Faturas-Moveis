<template>
  <q-page class="q-pa-sm">


    <!-- Seção de Faturas Recentes -->
    <div>
      <h2 class="text-h6">Faturas Recentes</h2>
      <q-list bordered separator class="styled-invoices-list">
        <q-item clickable class="styled-invoice-item" v-for="invoice in recentInvoices" :key="invoice.id">
          <q-item-section avatar>
            <q-icon name="eva-file-outline" class="invoice-icon" />
          </q-item-section>
          <q-item-section>
            <p class="invoice-name">{{ invoice.name }}</p>
          </q-item-section>
          <q-item-section side>
            <p class="invoice-date">{{ invoice.date }}</p>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- Seção de Estatísticas -->
    <div>
      <h2 class="text-h6">Estatísticas</h2>
      <div class="row justify-between">
        <q-card flat bordered class="styled-stat-card" v-for="statistic in statistics" :key="statistic.id">
          <p class="text-h6 stat-value">{{ statistic.value }}</p>
          <p class="stat-label">{{ statistic.label }}</p>
        </q-card>
      </div>
    </div>

    <!-- Seção de Tarefas Pendentes -->
    <div>
      <h2 class="text-h6">Tarefas Pendentes</h2>
      <q-list bordered separator class="styled-invoices-list">
        <q-item clickable class="styled-invoice-item" v-for="task in pendingTasks" :key="task.id">
          <q-item-section avatar>
            <q-icon name="eva-checkmark-circle-2-outline" class="invoice-icon" />
          </q-item-section>
          <q-item-section>
            <p class="invoice-name">{{ task.name }}</p>
          </q-item-section>
          <q-item-section side>
            <p class="invoice-date">{{ task.dueDate }}</p>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- Seção de Integração de Calendário -->
    <div>
    <h2 class="text-h6">Calendário</h2>
    <q-date v-model="date" class="my-calendar" />
  </div>
    <q-fab vertical-actions color="primary" icon="eva-plus-outline" class="float-right">
      <q-fab-action label="Nova Fatura" icon="eva-clipboard-outline" @click="goToCreateInvoice" />
      <q-fab-action label="Criar Recibo" icon="eva-file-text-outline" @click="goToCreateReceipt" />
      <q-fab-action label="Criar Cotação" icon="eva-pricetags-outline" @click="goToCreateQuote" />
    </q-fab>
  </q-page>
</template>

<script>

export default {
  data() {
    return {
      showWelcomeCard: true,
      recentInvoices: [
        { id: 1, name: 'Fatura 1', date: '12 Jan 2024' },
        { id: 2, name: 'Fatura 2', date: '12 Jan 2024' },
        { id: 3, name: 'Fatura 3', date: '12 Jan 2024' },
        // Adicione mais faturas conforme necessário
      ],
      statistics: [
        { id: 1, value: 100, label: 'Total de Faturas' },
        { id: 2, value: 100, label: 'Total de Recibos' },
        { id: 3, value: 100, label: 'Total de Cotacoes' },
        // Adicione mais estatísticas conforme necessário
      ],
      pendingTasks: [
        { id: 1, name: 'Tarefa 1', dueDate: '12 Jan 2024' },
        { id: 2, name: 'Tarefa 1', dueDate: '12 Jan 2024' },
        { id: 3, name: 'Tarefa 1', dueDate: '12 Jan 2024' },
        // Adicione mais tarefas conforme necessário
      ],
    
      date: new Date().toISOString().substr(0, 10), // Data atual
    };
  },
  mounted() {
    setTimeout(() => {
      this.showWelcomeCard = false;
    }, 5000); // O cartão de boas-vindas será ocultado após 5 segundos
  },

  methods: {

    goToCreateInvoice() {
      // Adicione a navegação para a criação de fatura conforme necessário
      console.log('Ir para criar fatura');
    },
    goToCreateReceipt() {
      // Adicione a navegação para a criação de recibo conforme necessário
      console.log('Ir para criar recibo');
    },
    goToCreateQuote() {
      // Adicione a navegação para a criação de cotação conforme necessário
      console.log('Ir para criar cotação');
    },
  },
};
</script>

<style scoped>
/**Cartão de Boas-vindas */

.my-card,
.my-calendar {
    max-width: 300px;
    margin: 0 auto;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }

/**Faturas */

.styled-invoices-list {
  max-width: 600px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.styled-invoice-item {
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.3s ease;
}

.styled-invoice-item:hover {
  background-color: #e0e0e0;
}

.invoice-icon {
  color: #3f51b5;
  font-size: 24px;
}

.invoice-name {
  font-weight: 600;
  color: #333;
}

.invoice-date {
  color: #757575;
  font-size: 14px;
}


.action-btn {
  transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
}

.action-btn:hover {
  transform: scale(1.05);
}

.recent-invoice-item,
.pending-task-item {
  transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
}

.recent-invoice-item:hover,
.pending-task-item:hover {
  background-color: #f5f5f5;
  transform: scale(1.02);
}



.q-icon {
  color: #3f51b5;
  /* Altere para a cor que preferir */
}

/**Estatísticas */
.stat-card {
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
}

.stat-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3);
}

.styled-stat-card {
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
  padding: 2px;
}

.styled-stat-card:hover {
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3);
}

.stat-value {
  font-weight: 600;
  color: #333;
}

.stat-label {
  color: #757575;
  font-size: 14px;
}

/**Tarefas */

.styled-tasks-list {
  max-width: 600px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.styled-task-item {
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.3s ease;
}

.styled-task-item:hover {
  background-color: #e0e0e0;
}

.task-icon {
  color: #3f51b5;
  font-size: 24px;
}

.task-name {
  font-weight: 600;
  color: #333;
}

.task-date {
  color: #757575;
  font-size: 14px;
}
</style>