<template>
  <q-page class="q-pa-sm">

    <!-- Seção de Visão Geral das Faturas -->
    <div>
      <h2 class="text-h6">Visão Geral das Faturas</h2>
      <p>Total de Faturas: {{ invoiceStats.total }}</p>
      <p>Valor Médio das Faturas: {{ invoiceStats.average }}</p>

    </div>

    <!--Graficos-->
    <div class="bar-chart-container">
      <svg ref="chart"></svg>
    </div>


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
    <div class="statistics-container">
    <h2 class="text-h6 title">Estatísticas</h2>
    <div class="row justify-between stats-row" style="flex-direction: row; flex-wrap: wrap;">
      <q-card flat bordered class="styled-stat-card" v-for="statistic in statistics" :key="statistic.id">
        <q-icon :name="`eva-${statistic.icon}`" class="stat-icon" />
        <p class="text-h6 stat-value">{{ statistic.value }}</p>
        <p class="stat-label">{{ statistic.label }}</p>
      </q-card>
    </div>
  </div>

    <!-- Seção de Tarefas Pendentes -->
    <div>
      <h2 class="text-h6">Faturas Pendentes</h2>
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



  </q-page>
</template>

<script>
import { Bar } from 'vue-chartjs';
import * as d3 from 'd3';
import { Chart, LinearScale } from 'chart.js';
Chart.register(LinearScale)
export default {
  extends: Bar,
  data() {
    return {
      showWelcomeCard: true,
      recentInvoices: [
        { id: 1, name: 'Fatura 1', date: '12 Jan 2024' },
        { id: 2, name: 'Fatura 2', date: '12 Jan 2024' },
        { id: 3, name: 'Fatura 3', date: '12 Jan 2024' },
        // Adicione mais faturas conforme necessário
      ],
      invoiceStats: {
        total: 0,
        average: 0,
      },
      statistics: [
        {
          id: 1,
          icon: 'activity-outline',
          value: this.unpaidInvoices, // Substitua por sua lógica para calcular o número de faturas não pagas
          label: 'Faturas Não Pagas'
        },
        {
          id: 2,
          icon: 'checkmark-circle-outline',
          value: this.paidInvoices, // Substitua por sua lógica para calcular o número de faturas pagas
          label: 'Faturas Pagas'
        },
        // Adicione mais estatísticas conforme necessário
      ],
      pendingTasks: [
        { id: 1, name: 'Fatura 1', dueDate: '12 Jan 2024' },
        { id: 2, name: 'Fatura 1', dueDate: '12 Jan 2024' },
        { id: 3, name: 'Fatura 1', dueDate: '12 Jan 2024' },
        // Adicione mais tarefas conforme necessário
      ],

      date: new Date().toISOString().substr(0, 10), // Data atual
    };
  },
  mounted() {
    this.createBarChart(window.innerWidth * 0.8); // 80% da largura da janela

  window.addEventListener('resize', () => {
    this.createBarChart(window.innerWidth * 0.8);
  });

    setTimeout(() => {
      this.showWelcomeCard = false;
    }, 5000); // O cartão de boas-vindas será ocultado após 5 segundos

    // Carregue suas faturas recentes aqui
    // this.recentInvoices = ...

    this.calculateInvoiceStats();

  },

  methods: {
    createBarChart() {
  const data = [40, 20, 12, 39];
  const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  let width = this.$refs.chart.parentElement.clientWidth - margin.left - margin.right;
  let height = 200 - margin.top - margin.bottom;

  const svg = d3.select(this.$refs.chart)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  const x = d3.scaleBand()
    .range([0, width])
    .domain(labels)
    .padding(0.1);

  const y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data)]);

    svg.append('g')
  .attr('class', 'axis x')
  .attr('transform', 'translate(0,' + height + ')')
  .call(d3.axisBottom(x));

svg.append('g')
  .attr('class', 'axis y')
  .call(d3.axisLeft(y));

  svg.selectAll('.bar')
    .data(data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', function(d, i) { return x(labels[i]); })
    .attr('width', x.bandwidth())
    .attr('y', function(d) { return y(d); })
    .attr('height', function(d) { return height - y(d); });

  // Função de redimensionamento
  window.addEventListener('resize', resize);

  function resize() {
    // Atualiza a largura
    width = parseInt(d3.select(this.$refs.chart).style('width'), 10) - margin.left - margin.right;

    // Atualiza a escala x
    x.range([0, width]);

    // Atualiza os eixos
    svg.select('.x-axis').call(d3.axisBottom(x));
    svg.select('.y-axis').call(d3.axisLeft(y));

    // Atualiza as barras
    svg.selectAll('.bar')
      .attr('x', function(d, i) { return x(labels[i]); })
      .attr('width', x.bandwidth());
  }
},



    calculateInvoiceStats() {
      this.invoiceStats.total = this.recentInvoices.length;
      this.invoiceStats.average = this.recentInvoices.reduce((sum, invoice) => sum + invoice.amount, 0) / this.recentInvoices.length;
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

.statistics-container {
  padding: 10px;
}

.text-h6 {
  font-size: 0.9rem;
}

.styled-stat-card {
  background: #f5f7fa;
  border-radius: 15px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  margin: 5px;
  padding: 5px;
  flex: 1 0 21%; /* Isso fará com que os cartões ocupem pelo menos 21% da linha, mas também permitirá que eles cresçam para preencher o espaço disponível. */
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
  background: #f5f7fa;
  border-radius: 15px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  margin: 5px;
  padding: 5px;
  width: 300px;
  text-align: center;
}



.styled-stat-card i {
  font-size: 2rem;
  color: #4a5568;
  margin-bottom: 10px;
}

.styled-stat-card:hover {
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3);
}

.stat-value {
  color: #2d3748;
  font-size: 2em;
  font-weight: bold;
}

.stat-label {
  color: #718096;
  font-size: 1em;
  text-transform: uppercase;
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

<style>
.bar {
  fill: steelblue;
}

.axis {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.x.axis path {
  display: none;
}
</style>
