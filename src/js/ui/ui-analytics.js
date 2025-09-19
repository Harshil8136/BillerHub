/**
 * UI ANALYTICS
 * ==================
 * This module handles rendering the analytics chart component.
 */

UI.Analytics = {
  chartInstance: null,

  /**
   * Renders the analytics chart or a fallback if Chart.js is not available.
   * @param {object} chartData The data object for the chart ({labels, data}).
   */
  renderChart(chartData) {
      if (!dom.analyticsDiv) return;

      // Render a simple list fallback if the Chart.js library failed to load
      if (typeof Chart === 'undefined') {
          const fallbackHtml = chartData.labels.length > 0
              ? chartData.labels.map((label, i) => `<div class="empty-state-item">${i + 1}. ${label} (${chartData.data[i]})</div>`).join('')
              : '<p class="empty-state">No viewing history yet.</p>';
          dom.analyticsDiv.innerHTML = `<h3 id="analytics-heading">Usage Analytics</h3><div class="empty-state-list">${fallbackHtml}</div>`;
          return;
      }

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      
      const ctx = dom.analyticsChart?.getContext('2d');
      if (!ctx) return;

      // The full Chart.js configuration would be implemented here.
      // This is a placeholder for that implementation.
      console.log("Chart.js rendering logic would execute here with data:", chartData);
  }
};