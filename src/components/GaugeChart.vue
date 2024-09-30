<template>
    <div class="gauge-chart">
      <!-- Title placed above the SVG -->
      <div class="chart-title">An Example of a Long Graph Name Title</div>
      <svg :width="width" :height="height" ref="svg"></svg>
      <div class="legend">
        <div class="legend-item"><span class="color-box" style="background-color: #263b80;"></span> Your Business</div>
        <div class="legend-item"><span class="color-box" style="background-color: #bb2325;"></span> Your Target</div>
        <div class="legend-item"><span class="color-box" style="background-color: #d1d3d4;"></span> Industry Benchmark</div>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import * as d3 from 'd3'; // Import D3.js
  
  export default {
    setup() {
      const width = 900;
      const height = 400; // Adjust height for a better layout
      const svg = ref(null);
  
      onMounted(() => {
        createGaugeChart();
      });
  
      const createGaugeChart = () => {
        const data = [
          { label: 'Your Business', value: 2000, maxValue: 6000, color: '#263b80' },
          { label: 'Your Target', value: 4000, maxValue: 6000, color: '#bb2325' },
          { label: 'Industry Benchmark', value: 6000, maxValue: 6000, color: '#999ea1' },
        ];
  
        const radius = 80;
        const arcWidth = 15;
        const centerX = width / 3; // Set appropriate width for each chart
        const centerY = height / 2 - 20; // Vertically center the charts
  
        const svgElement = d3.select(svg.value)
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", `translate(0, ${centerY})`);
  
        data.forEach((d, i) => {
          const group = svgElement.append("g")
            .attr("transform", `translate(${i * (centerX + 30) + centerX / 2}, 0)`);
  
          // Define the arc for background (complete full circle)
          const backgroundArc = d3.arc()
            .innerRadius(radius - arcWidth)
            .outerRadius(radius)
            .startAngle(0)
            .endAngle(2 * Math.PI); // Full circle
  
          // Define the arc for the actual data
          const arc = d3.arc()
            .innerRadius(radius - arcWidth)
            .outerRadius(radius)
            .startAngle(0)
            .endAngle((d.value / d.maxValue) * 2 * Math.PI); // Full circle
  
          // Background arc (for the full circle look)
          group.append("path")
            .attr("d", backgroundArc)
            .attr("fill", "#e0e0e0");
  
          // Foreground arc
          group.append("path")
            .attr("d", arc)
            .attr("fill", d.color);
  
          // Value text below the chart
          group.append("text")
            .attr("x", 0)
            .attr("y", radius + 20)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .text(`$${d.value}`);
        });
      };
  
      return {
        width,
        height,
        svg,
      };
    },
  };
  </script>
  
  <style scoped>
  .gauge-chart {
    text-align: center;
    margin-top: 20px;
  }
  
  .chart-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .legend {
    margin-top: 20px;
    font-size: 12px;
    display: flex; /* Align legends in one line */
    justify-content: center; /* Center the legends */
    gap: 20px; /* Add space between each legend item */
  }
  
  .legend-item {
    display: flex;
    align-items: center;
  }
  
  .color-box {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 5px;
  }
  </style>  