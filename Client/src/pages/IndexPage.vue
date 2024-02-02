<template>
  <q-page padding>


    <!-- Seção de Faturas Recentes -->
    <div>
      <div class="text-h6">Faturas Recentes</div>
      <q-list bordered separator class="recent-invoices-list">
        <q-item clickable class="recent-invoice-item" v-for="invoice in recentInvoices" :key="invoice.id">
          <q-item-section>
         
              <q-icon name="mdi-file-document-outline" class="invoice-icon" />
              {{ invoice.name }}
          
          </q-item-section>
          <q-item-section side>
            <p>{{ invoice.date }}</p>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- Seção de Estatísticas -->
    <div>
      <p class="text-h6">Estatísticas</p>
      <div class="row">
        <q-card flat bordered class="stat-card" v-for="statistic in statistics" :key="statistic.id">
          <p class="text-h6">{{ statistic.value }}</p>
          <p>{{ statistic.label }}</p>
        </q-card>
      
      </div>
    </div>

    <!-- Seção de Tarefas Pendentes -->
    <div>
      <p class="text-h6">Tarefas Pendentes</p>
      <q-list bordered separator class="pending-tasks-list">
        <q-item clickable class="pending-task-item" v-for="task in pendingTasks" :key="task.id">
          <q-item-section>
            
              <q-icon name="mdi-check-circle-outline" class="task-icon" />
              {{ task.name }}
          
          </q-item-section>
          <q-item-section side>
            {{ task.dueDate }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- Seção de Integração de Calendário -->
    <div>
      <p class="text-h6">Calendário</p>
      <q-calendar v-model="date" :events="calendarEvents" :event-color="getEventColor" class="my-calendar" />
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
        // Adicione mais tarefas conforme necessário
      ],
      calendarEvents: [
        { date: '2024/01/12', label: 'Evento 1', color: 'blue' },
        // Adicione mais eventos conforme necessário
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
    getEventColor(event) {
      return event.color;
    },
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
.my-card, .stat-card, .my-calendar {
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.my-card:hover, .stat-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3);
}

.action-btn {
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.action-btn:hover {
  transform: scale(1.05);
}

.recent-invoice-item, .pending-task-item {
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.recent-invoice-item:hover, .pending-task-item:hover {
  background-color: #f5f5f5;
  transform: scale(1.02);
}

.text-h6 {
  color: #3f51b5; /* Altere para a cor que preferir */
}

.q-icon {
  color: #3f51b5; /* Altere para a cor que preferir */
}
</style>