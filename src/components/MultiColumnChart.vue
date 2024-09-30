<template>
    <div class="column-chart">
      <div class="chart-title">Multi Column Chart Example</div>
      <svg :width="width" :height="height" ref="svg"></svg>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import * as d3 from 'd3'; // Import D3.js
  
  export default {
    setup() {
      const width = 600;
      const height = 400;
      const svg = ref(null);
  
      onMounted(() => {
        createColumnChart();
      });
  
      const createColumnChart = () => {
        const data = [
          { category: 'A', value1: 30, value2: 70 },
          { category: 'B', value1: 50, value2: 80 },
          { category: 'C', value1: 80, value2: 40 },
          { category: 'D', value1: 90, value2: 60 },
        ];
  
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const x0 = d3.scaleBand()
          .domain(data.map(d => d.category))
          .range([margin.left, width - margin.right])
          .padding(0.1);
  
        const x1 = d3.scaleBand()
          .domain(['value1', 'value2'])
          .range([0, x0.bandwidth()])
          .padding(0.05);
  
        const y = d3.scaleLinear()
          .domain([0, d3.max(data, d => Math.max(d.value1, d.value2))]).nice()
          .range([height - margin.bottom, margin.top]);
  
        const color = d3.scaleOrdinal()
          .domain(['value1', 'value2'])
          .range(['#1f77b4', '#ff7f0e']); // Different colors for each value
  
        const svgElement = d3.select(svg.value)
          .attr("width", width)
          .attr("height", height);
  
        svgElement.append("g")
          .selectAll("g")
          .data(data)
          .enter().append("g")
          .attr("transform", d => `translate(${x0(d.category)}, 0)`)
          .selectAll("rect")
          .data(d => ['value1', 'value2'].map(key => ({ key, value: d[key] })))
          .enter().append("rect")
          .attr("x", d => x1(d.key))
          .attr("y", d => y(d.value))
          .attr("height", d => y(0) - y(d.value))
          .attr("width", x1.bandwidth())
          .attr("fill", d => color(d.key));
  
        svgElement.append("g")
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x0));
  
        svgElement.append("g")
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y));
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
  .column-chart {
    text-align: center;
    margin-top: 20px;
  }
  
  .chart-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  </style>
  